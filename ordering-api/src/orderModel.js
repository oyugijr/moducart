const { pool } = require('./db');

async function init() {
  // Create table if missing, add idempotency column and index if missing
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId VARCHAR(255),
      items JSON,
      total DECIMAL(10,2),
      status VARCHAR(50) DEFAULT 'PENDING',
      idempotency_key VARCHAR(255) NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Ensure idempotency_key column exists (for older schemas)
  try {
    await pool.query(`ALTER TABLE orders ADD COLUMN IF NOT EXISTS idempotency_key VARCHAR(255) NULL`);
  } catch (e) {
    // ignore if not supported
  }

  // Try to create unique index on idempotency_key; ignore errors if exists
  try {
    await pool.query(`CREATE UNIQUE INDEX idx_orders_idempotency ON orders (idempotency_key)`);
  } catch (e) {
    // ignore errors (index exists or engine does not allow)
  }
}

async function createOrder(order) {
  // If idempotency key provided, check existing
  if (order.idempotencyKey) {
    const [rows] = await pool.query('SELECT * FROM orders WHERE idempotency_key = ?', [order.idempotencyKey]);
    if (rows && rows.length > 0) {
      return rows[0];
    }
  }

  const [result] = await pool.query(
    'INSERT INTO orders (userId, items, total, idempotency_key) VALUES (?, ?, ?, ?)',
    [order.userId, JSON.stringify(order.items), order.total, order.idempotencyKey || null]
  );

  const created = { id: result.insertId, userId: order.userId, items: order.items, total: order.total, status: 'PENDING', createdAt: new Date() };
  return created;
}

async function getOrder(id) {
  const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
  return rows[0];
}

module.exports = { init, createOrder, getOrder };
