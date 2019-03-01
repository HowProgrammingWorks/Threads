'use strict';

const threads = require('worker_threads');
const { Worker } = threads;

const buffer = new SharedArrayBuffer(1024);
const array = new Int8Array(buffer);

const worker = new Worker('./4-access.js', { workerData: { buffer } });

worker.on('message', msg => {
  if (msg.name === 'display') {
    console.dir({ value: array[0] });
  }
});

process.on('SIGINT', () => {
  worker.terminate(() => {
    console.log('Bye');
  });
});
