const { createOrder, getOrder } = require('./orderModel');
const { publishOrder } = require('./rabbit');

async function placeOrder(req, res) {
  const { userId, items, total } = req.body;

  if (!userId || !items || !total) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // Basic validation: items should be array and total should match item sums
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Items must be a non-empty array' });
  }
  // Accept both `quantity` and legacy `qty` fields for compatibility
  const computedTotal = items.reduce((sum, it) => {
    const price = Number(it.price || 0);
    const qty = Number(it.quantity ?? it.qty ?? 0);
    return sum + (price * qty);
  }, 0);
  // allow small rounding differences
  if (Math.abs(computedTotal - Number(total)) > 0.01) {
    return res.status(400).json({ message: 'Total does not match items' });
  }

  try {
    const idempotencyKey = req.headers['idempotency-key'] || req.body.idempotencyKey || null;
    const order = await createOrder({ userId, items, total, idempotencyKey });
    const published = publishOrder(order);
    return res.status(201).json({ ...order, published: !!published });
  } catch (err) {
    console.error('Failed to place order:', err.message || err);
    return res.status(500).json({ message: 'Failed to place order' });
  }
}

async function fetchOrder(req, res) {
  const { id } = req.params;
  const order = await getOrder(id);
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
}

module.exports = { placeOrder, fetchOrder };
