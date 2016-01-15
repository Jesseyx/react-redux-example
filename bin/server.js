#!/usr/bin/env node

// babel registration (runtime transpilation for node)
// 这里都是用的 babel5 5和6区别很大，后期再改吧，这里是启动 node 端的 babel 转换
// Require Hook
// One of the ways you can use Babel is through the require hook. The require hook will bind itself to node's require and automatically compile files on the fly. 
require('../server.babel');

var path = require('path');
var rootDir = path.resolve(__dirname, '..');

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;   // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools =
  new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function () {
    require('../src/server');
  });