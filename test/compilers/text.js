function text(module, filename) {
  return module;
}

require.extensions['.html'] = text;
