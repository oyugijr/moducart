const express = require('express');
const redis = require('redis');
const basketService = require('./basketService');

const app = express();
app.use(express.json());

// Redis client
const client = redis.createClient({ 
    url: `redis://${process.env.REDIS_HOST}:6379` 
});

client.connect()
  .then(() => console.log('🧠 Connected to Redis'))
  .catch(err => console.error('Redis Error:', err));

// Routes
app.get('/basket/:userId', (req, res) => basketService.getBasket(req, res, client));
app.post('/basket/:userId', (req, res) => basketService.addToBasket(req, res, client));
app.delete('/basket/:userId', (req, res) => basketService.clearBasket(req, res, client));

// Start server
app.listen(4002, () => {
  console.log('🧺 Basket API running on port 4002');
});
