'use strict';

const threads = require('node:worker_threads');
const { Worker } = threads;

console.dir({ master: threads });
const workerData = { text: 'Data from Master to Worker' };
const worker = new Worker('./2-worker.js', { workerData });

worker.postMessage('Message from Master to Worker');
worker.on('message', (...args) => {
  console.log({ args });
});
worker.on('error', (err) => {
  console.log(err.stack);
});
worker.on('exit', (code) => {
  console.dir({ code });
});

setTimeout(async () => {
  await worker.terminate();
  console.log('Terminated');
}, 1000);
