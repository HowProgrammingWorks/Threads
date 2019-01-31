'use strict';

const threads = require('worker_threads');
const { Worker } = threads;

const getInheritance = (instance, parents = []) => {
  const parent = Object.getPrototypeOf(instance);
  if (!parent) return parents;
  parents.push(parent.constructor.name);
  return getInheritance(parent, parents);
};

if (threads.isMainThread) {
  console.dir({ master: threads });
  const workerData = { text: 'Data from Master to Worker' };
  const worker = new Worker(__filename, { workerData });
  worker.on('message', (...args) => {
    console.log({ args });
  });
  worker.on('error', err => {
    console.log(err.stack);
  });
  worker.on('exit', code => {
    console.dir({ code });
  });
  console.dir(getInheritance(worker));
} else {
  console.dir({ worker: threads });
  threads.parentPort.postMessage('Hello there!');
  setTimeout(() => {
    const data = { text: 'Message from Worker to Master' };
    threads.parentPort.postMessage(data);
  }, 1000);
}
