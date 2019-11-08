'use strict';

const threads = require('worker_threads');
const http = require('http');

const port = 8000;

threads.parentPort.postMessage({ name: 'started', port });

const routing = {
  '/': async (req, res) => ({ status: res.statusCode }),
  '/api/method': async (req, res) => ({ status: res.statusCode }),
};

const types = {
  object: JSON.stringify,
  string: s => s,
  number: n => n.toString(),
  undefined: () => 'not found',
};

http.createServer(async (req, res) => {
  const handler = routing[req.url];
  if (!handler) {
    res.end('Handler not found');
    return;
  }
  const data = await handler(req, res);
  const type = typeof data;
  const serializer = types[type];
  const result = serializer(data);
  res.end(result);
}).listen(port);
