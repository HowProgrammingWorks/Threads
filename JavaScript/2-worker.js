'use strict';

const threads = require('worker_threads');

console.dir({ worker: threads });
threads.parentPort.postMessage('Message from Worker to Master');
threads.parentPort.on('message', data => {
  console.dir({ data });
});

process.exit(0);
