'use strict';

const threads = require('worker_threads');
const { Worker } = threads;

const buffer = new SharedArrayBuffer(1024);

const worker = new Worker('./5-access.js', { workerData: { buffer } });

setInterval(() => {
  console.dir(buffer);
}, 100);

process.on('SIGINT', async () => {
  await worker.terminate();
  console.log('Bye');
  process.exit(0);
});
