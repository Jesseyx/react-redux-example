import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
// import createStore from './redux/create';
// import ApiClient from './helpers/ApiClient';
// import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';

import {ReduxRouter} from 'redux-router';
// import createHistory from 'history/lib/createMemoryHistory';
// import {reduxReactRouter, match} from 'redux-router/server';
import {Provider} from 'react-redux';
import qs from 'query-string';
// import getRoutes from './routes';
// import getStatusFromRoutes from './helpers/getStatusFromRoutes';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
// const proxy = httpProxy.createProxyServer({
//   target: 'http://' + config.apiHost + ':' + config.apiPort,
//   ws: true
// });

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

// Proxy to api server
app.use('/api', (req, res) => {
  proxy.web(req, res);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527


if (config.port) {
  if (config.isProduction) {
    const io = new SocketIo(server);
    io.path('/api/ws');
  }

  server.listen(config.port, (err) => {
    if (err) {
      console.log(err);
    }

    console.info('----\n==>     %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==>     open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}

app.use('/', function (req, res) {
  res.end('It works!');
})