const { createOrder, getOrder } = require('./orderModel');
const { publishOrder } = require('./rabbit');

async function placeOrder(req, res) {
  const { userId, items, total } = req.body;

  if (!userId || !items || !total) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const order = await createOrder({ userId, items, total });
  publishOrder(order);

  res.status(201).json(order);
}

async function fetchOrder(req, res) {
  const { id } = req.params;
  const order = await getOrder(id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
}

module.exports = { placeOrder, fetchOrder };
