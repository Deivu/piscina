'use strict';

const Piscina = require('../..');

class Shared {
  constructor (data) {
    this.data = data;
  }

  get [Piscina.transferableSymbol] () {
    return [this.data];
  }

  get [Piscina.valueSymbol] () {
    return { data: this.data };
  }
}

module.exports = ({ port }) => {
  const data = Buffer.from('this is a test').buffer;
  const shared = new Shared(data);
  try {
    return Piscina.move(shared);
  } finally {
    setTimeout(() => port.postMessage(data.byteLength), 2500);
  }
};
