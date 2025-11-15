const amqp = require('amqplib');

let channel = null;
let connection = null;

const QUEUE_NAME = process.env.ORDER_QUEUE || 'order_created';

async function connectRabbit(retries = 5, delay = 2000) {
  // Prefer a full URL in RABBIT_URL. If only host is provided, compose a URL using
  // RABBIT_USER / RABBIT_PASS (defaults to guest/guest) and optional RABBIT_PORT.
  const url = process.env.RABBIT_URL || (process.env.RABBIT_HOST
    ? `amqp://${process.env.RABBIT_USER || 'guest'}:${process.env.RABBIT_PASS || 'guest'}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT || 5672}`
    : 'amqp://guest:guest@localhost:5672');
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      connection = await amqp.connect(url);
      channel = await connection.createChannel();
      await channel.assertQueue(QUEUE_NAME, { durable: true });
      console.log('🐇 Connected to RabbitMQ');
      // handle close/errors and try to reconnect
      connection.on('close', () => {
        console.warn('RabbitMQ connection closed');
        channel = null;
      });
      connection.on('error', (err) => {
        console.error('RabbitMQ connection error', err.message || err);
      });
      return;
    } catch (err) {
      console.error(`RabbitMQ connect attempt ${attempt} failed:`, err.message || err);
      if (attempt < retries) {
        await new Promise(r => setTimeout(r, delay));
        delay *= 2;
      } else {
        throw err;
      }
    }
  }
}

function publishOrder(order) {
  try {
    if (!channel) {
      console.warn('Cannot publish order, RabbitMQ channel is not available. Skipping publish.');
      return false;
    }
    const ok = channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(order)), { persistent: true });
    return ok;
  } catch (err) {
    console.error('Failed to publish order to RabbitMQ:', err.message || err);
    return false;
  }
}

module.exports = { connectRabbit, publishOrder };
