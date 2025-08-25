const amqp = require('amqplib');

let channel;

async function connectRabbit() {
  const connection = await amqp.connect(`amqp://${process.env.RABBIT_HOST}`);
  channel = await connection.createChannel();
  await channel.assertQueue('order_created');
  console.log('🐇 Connected to RabbitMQ');
}

function publishOrder(order) {
  channel.sendToQueue('order_created', Buffer.from(JSON.stringify(order)));
}

module.exports = { connectRabbit, publishOrder };
