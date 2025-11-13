const amqplib = require('amqplib');

const RABBIT_URL = process.env.RABBITMQ_URL || process.env.AMQP_URL || 'amqp://localhost';
const DEFAULT_QUEUE = process.env.PRODUCT_STOCK_QUEUE || 'product.stock';

let connection = null;
let channel = null;

async function getChannel() {
    if (channel) return channel;
    if (!connection) {
        connection = await amqplib.connect(RABBIT_URL);
    }
    channel = await connection.createChannel();
    return channel;
}

async function publish(queue, msg) {
    try {
        const ch = await getChannel();
        await ch.assertQueue(queue || DEFAULT_QUEUE, { durable: true });
        return ch.sendToQueue(queue || DEFAULT_QUEUE, Buffer.from(JSON.stringify(msg)), { persistent: true });
    } catch (err) {
        // swallow here but return false so callers can decide
        console.error('RabbitMQ publish error', err.message || err);
        return false;
    }
}

module.exports = { publish };
