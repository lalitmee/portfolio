const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createRequire } = require('node:module');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');
const React = require('react');
const { featuredApp } = require('../data/apps.ts');
require('./load-tsx.cjs');
const { renderToStaticMarkup } = require('react-dom/server');

test('home Explore my work uses the existing iris-fill details button', () => {
  const filename = path.resolve('pages/index.tsx');
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText,
    {
      exports,
      require: (name) =>
        name.includes('/components/')
          ? () => null
          : createRequire(filename)(name),
    },
  );
  const hero = exports.default().props.children[0];
  const actions = hero.props.children[0].props.children.find(
    (child) => child?.props?.className === 'hero-actions',
  );
  const link = actions.props.children[0];
  assert.equal(link.props.className, 'button button-outline section-button');
  assert.equal(link.props.href, '/work/');
  assert.equal(typeof link.props.onPointerEnter, 'function');
  assert.ok(
    link.props.children.some(
      (child) =>
        child?.props?.className === 'section-button-fill' &&
        child.props['aria-hidden'] === 'true',
    ),
  );
});

test('app detail distinguishes launch and source actions and preserves external destinations', () => {
  const filename = path.resolve('pages/apps/[slug].tsx');
  const exports = {};
  vm.runInNewContext(
    ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText,
    {
      exports,
      require: (name) => {
        if (name === 'react')
          return {
            ...React,
            useRef: () => ({ current: null }),
            useState: () => [false, () => {}],
            useEffect: () => {},
          };
        if (name === 'framer-motion') return { useReducedMotion: () => false };
        if (name.includes('/icons/')) return createRequire(filename)(name);
        if (name.includes('TiltedArrow')) return createRequire(filename)(name);
        if (name.includes('/components/')) return () => null;
        return createRequire(filename)(name);
      },
    },
  );
  const article = exports.default({ app: featuredApp }).props.children[0];
  const nav = article.props.children.find((child) => child?.type === 'nav');
  const links = nav.props.children.props.children;
  for (const [index, url] of [
    featuredApp.liveUrl,
    featuredApp.sourceUrl,
  ].entries()) {
    assert.equal(
      links[index].props.className,
      index === 0 ? 'button button-outline section-button' : 'text-link',
    );
    assert.equal(links[index].props.href, url);
    assert.equal(links[index].props.target, '_blank');
    assert.equal(links[index].props.rel, 'noreferrer');
  }
  const fill = links[0].props.children.find(
    (child) => child?.props?.className === 'section-button-fill',
  );
  assert.equal(fill.props['aria-hidden'], 'true');
  const launchIcons = [
    links[0].props.children.find(
      (child) => child?.props?.className === 'button-arrow',
    ),
    fill.props.children.find(
      (child) => child?.props?.className === 'button-arrow',
    ),
  ];
  for (const icon of launchIcons) {
    const html = renderToStaticMarkup(icon);
    assert.match(html, /class="tilted-arrow button-arrow/);
    assert.match(html, /aria-hidden="true"/);
  }
  const origin = {};
  links[0].props.onPointerEnter({
    clientX: 12,
    clientY: 25,
    currentTarget: {
      getBoundingClientRect: () => ({ left: 10, top: 20 }),
      style: {
        setProperty: (name, value) => {
          origin[name] = value;
        },
      },
    },
  });
  assert.deepEqual(origin, { '--reveal-x': '3px', '--reveal-y': '6px' });
});
