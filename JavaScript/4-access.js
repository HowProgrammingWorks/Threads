'use strict';

const threads = require('worker_threads');

const { buffer } = threads.workerData;
const array = new Int8Array(buffer);
array[0] = 123;
threads.parentPort.postMessage({ name: 'display' });
