'use strict';

const Piscina = require('../..');

module.exports = ({ port }) => {
  const data = Buffer.from('this is a test').buffer;
  try {
    return Piscina.move(data);
  } finally {
    setTimeout(() => port.postMessage(data.byteLength), 2500);
  }
};
