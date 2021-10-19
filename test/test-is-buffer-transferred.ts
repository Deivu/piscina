import Piscina from '../dist/src';
import { test } from 'tap';
import { resolve } from 'path';
import { MessageChannel } from 'worker_threads';

function wait (channel) {
  return new Promise(resolve => {
    channel.port2.on('message', (byteLength) => {
      channel.port2.close();
      resolve(byteLength);
    });
  });
}

test('array buffer must be transferred', async ({ equal }) => {
  const pool = new Piscina({
    filename: resolve(__dirname, 'fixtures/send-buffer-then-send-message.js'),
    useAtomics: false
  });
  const channel = new MessageChannel();
  await pool.run({ port: channel.port1 }, { transferList: [channel.port1] });
  const byteLength = await wait(channel);
  equal(byteLength, 0);
});

test('objects that implement transferable must be transferred', async ({ equal }) => {
  const pool = new Piscina({
    filename: resolve(__dirname, 'fixtures/send-transferrable-then-send-message.js'),
    useAtomics: false
  });
  const channel = new MessageChannel();
  await pool.run({ port: channel.port1 }, { transferList: [channel.port1] });
  const byteLength = await wait(channel);
  equal(byteLength, 0);
});
