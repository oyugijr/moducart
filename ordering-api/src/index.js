const express = require('express');
const { connectRabbit } = require('./rabbit');
const { placeOrder, fetchOrder } = require('./orderService');
const { init: initDB } = require('./orderModel');
const { ensureConnection } = require('./db');

const app = express();
app.use(express.json());

// Basic health endpoint
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'ordering-api', uptime: process.uptime() }));

app.post('/orders', placeOrder);
app.get('/orders/:id', fetchOrder);

const PORT = process.env.PORT || 4004;

(async () => {
  try {
    // Ensure DB is reachable before attempting schema init
    await ensureConnection();
    await initDB();
    console.log('✅ Orders DB initialized');
  } catch (err) {
    console.error('Orders DB initialization failed:', err.message || err);
  }

  // Start RabbitMQ connection but don't block server start if RabbitMQ is down
  connectRabbit().catch(err => console.error('RabbitMQ connection failed:', err.message || err));

  app.listen(PORT, () => {
    console.log(`📦 Ordering API running on port ${PORT}`);
  });
})();
