const express = require('express');
const { connectRabbit } = require('./rabbit');
const { placeOrder, fetchOrder } = require('./orderService');

const app = express();
app.use(express.json());

app.post('/orders', placeOrder);
app.get('/orders/:id', fetchOrder);

connectRabbit().catch(err => console.error(err));

app.listen(4004, () => {
  console.log('📦 Ordering API running on port 4004');
});
