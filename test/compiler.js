'use strict';

var babel = require("babel-core");
var babelTransform = babel.transform;

var fs = require('fs');
var JSDOM = require('jsdom').JSDOM;

// needed for animatedScrollTo
var dom = new JSDOM('<!doctype html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.navigator = global.window.navigator;

// borrowed from https://github.com/babel/babel-jest/blob/master/index.js
require.extensions['.jsx'] = function (module, filename) {
  var src = fs.readFileSync(filename, 'utf8');
  // Allow the stage to be configured by an environment
  // variable, but use Babel's default stage (2) if
  // no environment variable is specified.
  // var stage = process.env.BABEL_JEST_STAGE || 2;

  // Ignore all files within node_modules
  if (filename.indexOf('node_modules') === -1 /*&& babel.canCompile(filename)*/) {
    var compiled = babelTransform(src, { 
      filename: filename, 
      // stage: stage,
      presets: ["es2015", "react-app"],
      plugins: ["transform-es2015-modules-commonjs"]
    }).code;
    return module._compile(compiled, filename);
  }
  return module;
};
