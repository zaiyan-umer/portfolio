import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';

const root = path.resolve(import.meta.dirname, '../..');
const requireModule = createRequire(import.meta.url);

// Exercise real application modules while preventing CMS/network side effects.
export function securityHarness(options = {}) {
  const state = { writes: [], logs: [], clientOptions: [], writeError: null, now: 0 };
  const cache = new Map();
  const environment = {
    SANITY_API_WRITE_TOKEN: 'synthetic-test-token',
    NEXT_PUBLIC_SANITY_PROJECT_ID: 'synthetic-project',
    NEXT_PUBLIC_SANITY_DATASET: 'synthetic',
    ...options.env,
  };
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [state.now])); }
    static now() { return state.now; }
  }

  function load(relative) {
    const file = path.resolve(root, relative);
    if (cache.has(file)) return cache.get(file).exports;
    const loaded = { exports: {} };
    cache.set(file, loaded);
    const source = options.source ? options.source(path.relative(root, file)) : fs.readFileSync(file, 'utf8');
    const compiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
      fileName: file,
    }).outputText;
    function imports(id) {
      if (id === 'server-only') return {};
      if (id === 'next-sanity') return {
        createClient: (config) => {
          state.clientOptions.push(config);
          return { create: async (document) => {
            if (state.writeError) throw state.writeError;
            state.writes.push(document);
            return { ...document, _id: document._id || 'synthetic-root-id' };
          } };
        },
      };
      if (id === '@/sanity/env') return { projectId: 'synthetic-project', dataset: 'synthetic', apiVersion: '2026-01-20' };
      if (id === 'sanity') return { defineConfig: (config) => config };
      if (id === '@sanity/vision') return { visionTool: () => ({}) };
      if (id === 'sanity/structure') return { structureTool: () => ({}) };
      if (id === './sanity/schemaTypes') return { schema: { types: [] } };
      if (id === './sanity/structure') return { structure: () => ({}) };
      if (id.startsWith('@/') || id.startsWith('.')) {
        const base = id.startsWith('@/') ? path.join(root, id.slice(2)) : path.resolve(path.dirname(file), id);
        const target = path.extname(base) ? base : ['.ts', '.tsx'].map((ext) => base + ext).find((candidate) => fs.existsSync(candidate));
        if (!target) throw new Error(`Missing fixture module: ${id}`);
        return load(target);
      }
      return requireModule(id);
    }
    const execute = vm.runInThisContext(`(function(require,module,exports,process,Date,console,setTimeout,clearTimeout,fetch){${compiled}\n})`, { filename: file });
    execute(imports, loaded, loaded.exports, { env: environment }, Clock,
      { error: (...args) => state.logs.push(args), warn: (...args) => state.logs.push(args) },
      options.setTimeout || setTimeout, clearTimeout, () => { throw new Error('Network access is forbidden in security fixtures'); });
    return loaded.exports;
  }

  return { state, load };
}

