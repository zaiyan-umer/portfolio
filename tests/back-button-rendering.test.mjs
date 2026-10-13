import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const requireModule = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, '..');
const { AppRouterContext, LayoutRouterContext } = requireModule('next/dist/shared/lib/app-router-context.shared-runtime');
const { PathnameContext } = requireModule('next/dist/shared/lib/hooks-client-context.shared-runtime');

// Compile the actual component and its utility without adding a TS test runner.
function load(relative) {
  const file = path.join(root, relative);
  const { outputText } = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
    fileName: file,
  });
  const loaded = { exports: {} };
  const imports = (id) => id === '@/lib/utils' ? load('lib/utils.ts') : requireModule(id);
  const execute = vm.runInThisContext(`(function(require,module,exports){${outputText}\n})`, { filename: file });
  execute(imports, loaded, loaded.exports);
  return loaded.exports;
}

const BackButton = load('components/layout/BackButton.tsx').default;
const page = ['__PAGE__', {}];
const homepage = ['(frontend)', { children: page }];
const router = { back() {}, push() {} };

function render(parentTree, pathname) {
  return renderToStaticMarkup(
    React.createElement(AppRouterContext.Provider, { value: router },
      React.createElement(LayoutRouterContext.Provider, {
        value: { parentTree, parentRenderTree: { data: { bfcacheId: 0 } } },
      },
        React.createElement(PathnameContext.Provider, { value: pathname },
          React.createElement(BackButton, { className: 'regression-class' }),
        ),
      ),
    ),
  );
}

test('homepage omits Back when the server pathname is normalized to /index', () => {
  assert.equal(render(homepage, '/index'), '');
});

test('homepage markup agrees across server /index and browser / pathnames', () => {
  assert.equal(render(homepage, '/'), '');
  assert.equal(render(homepage, '/index'), render(homepage, '/'));
});

for (const [name, pathname, child] of [
  ['Projects', '/projects', ['projects', { children: page }]],
  ['Education', '/education', ['education', { children: page }]],
  ['project detail', '/projects/example', ['projects', { children: [['slug', 'example', 'd'], { children: page }] }]],
]) {
  test(`${name} retains the Back row and caller class independently of pathname`, () => {
    const tree = ['(frontend)', { children: child }];
    const markup = render(tree, pathname);
    assert.match(markup, /class="portfolio-back-button portfolio-container"/);
    assert.match(markup, /class="portfolio-back-control regression-class"/);
    assert.match(markup, /<button type="button"/);
    assert.equal(render(tree, '/'), markup);
  });
}
