'use strict';

const threads = require('worker_threads');

const { buffer } = threads.workerData;
const array = new Int8Array(buffer);

setInterval(() => {
  for (let j = 0; j < 1024; j++) {
    array[j] += 1;
  }
}, 100);
