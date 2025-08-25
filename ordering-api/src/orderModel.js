const pool = require('./db');

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId VARCHAR(255),
      items JSON,
      total DECIMAL(10,2),
      status VARCHAR(50) DEFAULT 'PENDING',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
init();

async function createOrder(order) {
  const [result] = await pool.query(
    'INSERT INTO orders (userId, items, total) VALUES (?, ?, ?)',
    [order.userId, JSON.stringify(order.items), order.total]
  );
  return { id: result.insertId, ...order };
}

async function getOrder(id) {
  const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
  return rows[0];
}

module.exports = { createOrder, getOrder };
