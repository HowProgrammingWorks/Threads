'use strict';

const threads = require('worker_threads');
const { Worker } = threads;

const worker = new Worker('./3-http.js');

worker.on('message', msg => {
  if (msg.name === 'started') {
    console.log(`HTTP Server Started on ${msg.port}`);
  }
});

process.on('SIGINT', () => {
  worker.terminate(() => {
    console.log('HTTP Server Stopped');
  });
});
