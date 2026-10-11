import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { securityHarness } from './helpers/security-harness.mjs';

const valid = { name: 'Fixture sender', email: 'fixture@example.com', message: 'Synthetic message only' };
function request(body = valid, headers = {}) {
  return new Request('https://portfolio.invalid/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}
async function submit(harness, body = valid, headers = {}) {
  const response = await harness.load('features/contact/server/handler.ts').handleContactPost(request(body, headers));
  return { status: response.status, body: await response.json() };
}
function streamedRequest(chunks, headers = {}, onCancel = () => {}) {
  let index = 0;
  const body = new ReadableStream({
    pull(controller) {
      if (index < chunks.length) controller.enqueue(chunks[index++]);
      else controller.close();
    },
    cancel: onCancel,
  });
  return new Request('https://portfolio.invalid/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body, duplex: 'half' });
}

test('successful writes use private, unique IDs and server-owned fields', async () => {
  const h = securityHarness();
  const a = await submit(h, { ...valid, name: ' Fixture sender ', message: ' Synthetic message only ', _id: 'public-id', _type: 'project', read: true, submittedAt: 'attacker-date' });
  const b = await submit(h);
  assert.equal(a.status, 200);
  assert.deepEqual(a.body, { success: true, id: h.state.writes[0]._id });
  assert.equal(b.status, 200);
  assert.notEqual(h.state.writes[0]._id, h.state.writes[1]._id);
  const doc = h.state.writes[0];
  assert.match(doc._id, /^contactMessages\.[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/);
  assert.deepEqual(Object.keys(doc).sort(), ['_id', '_type', 'name', 'email', 'message', 'submittedAt', 'read'].sort());
  assert.equal(doc._type, 'message');
  assert.equal(doc.read, false);
  assert.equal(doc.submittedAt, new Date(0).toISOString());
  assert.equal(doc.name, valid.name);
  assert.equal(doc.message, valid.message);
});

for (const [label, body] of [
  ['whitespace name', { ...valid, name: ' \t ' }], ['whitespace message', { ...valid, message: '\n ' }],
  ['invalid email', { ...valid, email: 'bad' }], ['object injection', { ...valid, name: { $gt: '' } }],
  ['array', [valid]], ['null', null], ['empty object', {}],
  ['long name', { ...valid, name: 'n'.repeat(101) }], ['long email', { ...valid, email: 'e'.repeat(255) + '@example.com' }],
  ['long message', { ...valid, message: 'm'.repeat(5001) }],
]) test(`invalid input: ${label} is rejected without a write`, async () => {
  const h = securityHarness();
  assert.equal((await submit(h, body)).status, 400);
  assert.equal(h.state.writes.length, 0);
});

test('field boundaries and Unicode are accepted without truncation', async () => {
  const h = securityHarness();
  const body = { name: 'n'.repeat(100), email: 'a'.repeat(64) + '@' + 'b'.repeat(63) + '.' + 'c'.repeat(63) + '.' + 'd'.repeat(61), message: '中'.repeat(5000) };
  assert.equal(body.email.length, 254);
  assert.equal((await submit(h, body)).status, 200);
  assert.equal(h.state.writes[0].message, body.message);
});

test('non-JSON media types reject cross-site simple submissions', async () => {
  for (const media of ['text/plain', 'application/x-www-form-urlencoded', 'multipart/form-data']) {
    const h = securityHarness();
    assert.equal((await submit(h, valid, { 'Content-Type': media })).status, 415);
    assert.equal(h.state.writes.length, 0);
  }
  const h = securityHarness();
  assert.equal((await submit(h, valid, { 'Content-Type': 'application/json; charset=utf-8' })).status, 200);
});

test('malformed JSON counts toward throttling and never logs input', async () => {
  const h = securityHarness();
  for (let i = 0; i < 5; i++) assert.equal((await submit(h, '{invalid')).status, 400);
  assert.equal((await submit(h)).status, 429);
  assert.equal(h.state.writes.length, 0);
  assert.equal(h.state.logs.length, 0);
});

test('throttled requests are rejected before reading their body', async () => {
  const h = securityHarness();
  for (let i = 0; i < 5; i++) assert.equal((await submit(h)).status, 200);
  const response = await h.load('features/contact/server/handler.ts').handleContactPost({
    headers: new Headers(), get body() { throw new Error('The body must not be read'); },
  });
  assert.equal(response.status, 429);
  assert.equal(h.state.writes.length, 5);
});

test('body-size checks reject false and missing length declarations', async () => {
  for (const headers of [{}, { 'Content-Length': '1' }, { 'Content-Length': '99999' }]) {
    const h = securityHarness();
    assert.equal((await submit(h, JSON.stringify({ ...valid, message: 'm'.repeat(33000) }), headers)).status, 413);
    assert.equal(h.state.writes.length, 0);
  }
});

test('stream limit checks actual bytes and cancels oversized bodies', async () => {
  const h = securityHarness();
  let cancelled = false;
  const req = streamedRequest([new Uint8Array(32000), new Uint8Array(1000), new Uint8Array(1000)], { 'Content-Length': '1' }, () => { cancelled = true; });
  const response = await h.load('features/contact/server/handler.ts').handleContactPost(req);
  assert.equal(response.status, 413);
  assert.equal(cancelled, true);
  assert.equal(h.state.writes.length, 0);
});

test('reader accepts the exact byte boundary and split UTF-8 sequences', async () => {
  const h = securityHarness();
  const read = h.load('features/contact/server/request-body.ts').readContactBody;
  assert.deepEqual(await read(request('{}' + ' '.repeat(32766))), {});
  const encoded = new TextEncoder().encode(JSON.stringify({ ...valid, message: 'Hello 🌿' }));
  const decoded = await read(streamedRequest(Array.from(encoded, (byte) => new Uint8Array([byte]))));
  assert.equal(decoded.message, 'Hello 🌿');
});

test('invalid UTF-8 and failed streams return generic 400 errors', async () => {
  for (const req of [streamedRequest([new Uint8Array([255])]), new Request('https://portfolio.invalid/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, duplex: 'half',
    body: new ReadableStream({ start(controller) { controller.error(new Error('synthetic-private-details')); } }),
  })]) {
    const h = securityHarness();
    const response = await h.load('features/contact/server/handler.ts').handleContactPost(req);
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: 'Invalid message request.' });
    assert.equal(h.state.logs.length, 0);
  }
});

test('stalled body reads time out and cancel the stream', async () => {
  const h = securityHarness({ setTimeout: (fn) => setTimeout(fn, 5) });
  let cancelled = false;
  const req = new Request('https://portfolio.invalid/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, duplex: 'half',
    body: new ReadableStream({ pull() {}, cancel() { cancelled = true; } }),
  });
  const response = await h.load('features/contact/server/handler.ts').handleContactPost(req);
  assert.equal(response.status, 408);
  assert.equal(cancelled, true);
  assert.equal(h.state.writes.length, 0);
});

test('untrusted forwarded headers cannot rotate the throttle key', async () => {
  const h = securityHarness();
  for (let i = 0; i < 12; i++) {
    const response = await submit(h, valid, { 'X-Forwarded-For': `198.51.100.${i + 1}`, 'X-Vercel-Forwarded-For': `198.51.100.${i + 1}`, 'X-Vercel-Id': 'synthetic' });
    assert.equal(response.status, i < 5 ? 200 : 429);
  }
  assert.equal(h.state.writes.length, 5);
});

test('only a protected Vercel IP header is trusted on Vercel', () => {
  const key = securityHarness({ env: { VERCEL: '1' } }).load('features/contact/server/rate-limit.ts').contactRequestKey;
  assert.equal(key(new Headers({ 'x-vercel-forwarded-for': '198.51.100.2', 'x-forwarded-for': 'attacker' })), '198.51.100.2');
  assert.equal(key(new Headers({ 'x-vercel-forwarded-for': '2001:db8::1' })), '2001:db8::1');
  for (const value of ['attacker', '198.51.100.1, 198.51.100.2', 'x'.repeat(10000)]) assert.equal(key(new Headers({ 'x-vercel-forwarded-for': value })), 'unknown');
  assert.equal(key(new Headers({ 'x-forwarded-for': '198.51.100.2' })), 'unknown');
});

test('verified Vercel keys have independent five-request windows', async () => {
  const h = securityHarness({ env: { VERCEL: '1' } });
  for (let i = 0; i < 5; i++) assert.equal((await submit(h, valid, { 'X-Vercel-Forwarded-For': '198.51.100.1' })).status, 200);
  assert.equal((await submit(h, valid, { 'X-Vercel-Forwarded-For': '198.51.100.1' })).status, 429);
  assert.equal((await submit(h, valid, { 'X-Vercel-Forwarded-For': '198.51.100.2' })).status, 200);
  h.state.now = 60000;
  assert.equal((await submit(h, valid, { 'X-Vercel-Forwarded-For': '198.51.100.1' })).status, 200);
});

test('limiter saturation rejects new keys without evicting live quotas', () => {
  const h = securityHarness();
  const allow = h.load('features/contact/server/rate-limit.ts').allowContactRequest;
  for (let i = 0; i < 10000; i++) assert.equal(allow(`synthetic-${i}`), true);
  assert.equal(allow('overflow'), false);
  for (let i = 1; i < 5; i++) assert.equal(allow('synthetic-0'), true);
  assert.equal(allow('synthetic-0'), false);
  assert.equal(allow('overflow'), false);
  h.state.now = 60000;
  assert.equal(allow('overflow'), true);
});

test('limiter cleanup preserves newer active windows', () => {
  const h = securityHarness();
  const allow = h.load('features/contact/server/rate-limit.ts').allowContactRequest;
  for (let i = 0; i < 5; i++) allow('old');
  h.state.now = 30000;
  for (let i = 0; i < 5; i++) allow('new');
  h.state.now = 60000;
  assert.equal(allow('old'), true);
  assert.equal(allow('new'), false);
});

test('SDK failures expose neither exception details nor submitted text', async () => {
  const h = securityHarness();
  h.state.writeError = Object.assign(new Error('synthetic-secret'), { response: { body: { email: 'private-fixture@example.com' }, headers: { authorization: 'synthetic-secret' } } });
  const result = await submit(h);
  assert.equal(result.status, 500);
  assert.deepEqual(result.body, { error: 'Failed to send message' });
  assert.deepEqual(h.state.logs, [['Contact message write failed.']]);
  assert.equal(h.state.writes.length, 0);
});

test('client validation matches limits and the form declares them', () => {
  const h = securityHarness();
  const validate = h.load('features/contact/lib/validation.ts').validate;
  assert.deepEqual(validate(valid), {});
  assert.ok(validate({ ...valid, name: 'n'.repeat(101) }).name);
  assert.ok(validate({ ...valid, email: 'e'.repeat(255) }).email);
  assert.ok(validate({ ...valid, message: 'm'.repeat(5001) }).message);
  const html = renderToStaticMarkup(React.createElement(h.load('features/contact/components/ContactForm.tsx').ContactForm));
  for (const limit of [100, 254, 5000]) assert.ok(html.includes(`maxLength="${limit}"`));
});

test('Studio cannot create or duplicate messages with public default IDs', () => {
  const config = securityHarness().load('sanity.config.ts').default;
  const templates = [{ schemaType: 'message' }, { schemaType: 'currently' }, { schemaType: 'project' }];
  assert.deepEqual(config.schema.templates(templates), [{ schemaType: 'project' }]);
  const actions = [{ action: 'duplicate' }, { action: 'publish' }, { action: 'delete' }];
  assert.deepEqual(config.document.actions(actions, { schemaType: 'message' }), actions.slice(1));
  assert.deepEqual(config.document.actions(actions, { schemaType: 'project' }), actions);
});

test('public link and script helpers reject execution payloads', () => {
  const h = securityHarness();
  const projectLink = h.load('features/projects/lib/story.ts').projectLink;
  const educationUrl = h.load('features/education/lib/content.ts').educationUrl;
  const currentlyLink = h.load('features/home/lib/currently.ts').currentlyLink;
  for (const url of ['javascript:alert(1)', 'data:text/html,<script>alert(1)</script>', 'java\nscript:alert(1)', '//attacker.invalid']) {
    for (const helper of [projectLink, educationUrl, currentlyLink]) assert.equal(helper(url), null);
  }
  const value = { name: '</script><script>synthetic</script>' };
  const serialized = h.load('lib/structured-data.ts').serializeStructuredData(value);
  assert.ok(!serialized.includes('<'));
  assert.deepEqual(JSON.parse(serialized), value);
});
