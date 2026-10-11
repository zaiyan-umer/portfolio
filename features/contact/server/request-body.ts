import 'server-only';

const MAX_BODY_BYTES = 32 * 1024;
const BODY_TIMEOUT_MS = 10000;

export class ContactRequestError extends Error {
  constructor(message: string, public readonly status: 400 | 408 | 413 | 415) {
    super(message);
  }
}

export async function readContactBody(request: Request): Promise<unknown> {
  const mediaType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
  if (mediaType !== 'application/json') {
    throw new ContactRequestError('Please send the message as JSON.', 415);
  }

  const declaredLength = request.headers.get('content-length');
  if (declaredLength && Number(declaredLength) > MAX_BODY_BYTES) {
    throw new ContactRequestError('The message request is too large.', 413);
  }
  if (!request.body) throw new ContactRequestError('Invalid message request.', 400);

  const reader = request.body.getReader();
  const body = new Uint8Array(MAX_BODY_BYTES);
  let bytes = 0;
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    void reader.cancel().catch(() => {});
  }, BODY_TIMEOUT_MS);

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (timedOut) throw new ContactRequestError('The request timed out. Please try again.', 408);
      if (done) break;
      if (bytes + value.byteLength > MAX_BODY_BYTES) {
        void reader.cancel().catch(() => {});
        throw new ContactRequestError('The message request is too large.', 413);
      }
      body.set(value, bytes);
      bytes += value.byteLength;
    }

    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(body.subarray(0, bytes)));
  } catch (error) {
    if (error instanceof ContactRequestError) throw error;
    throw new ContactRequestError('Invalid message request.', 400);
  } finally {
    clearTimeout(timeout);
    reader.releaseLock();
  }
}
