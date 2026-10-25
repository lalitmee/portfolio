const fs = require('node:fs');
const ts = require('typescript');

// Real local JSX modules for rendering checks; no browser or external services.
require.extensions['.tsx'] = (module, filename) => {
  module._compile(
    ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    }).outputText,
    filename,
  );
};
