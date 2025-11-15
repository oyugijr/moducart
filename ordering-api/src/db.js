const mysql = require('mysql2/promise');

const DEFAULTS = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'Oyugi222f',
  // Accept either MYSQL_DATABASE or MYSQL_DB for compatibility
  database: process.env.MYSQL_DATABASE || process.env.MYSQL_DB || 'ordersdb',
  waitForConnections: true,
  connectionLimit: parseInt(process.env.MYSQL_CONN_LIMIT, 10) || 10,
  queueLimit: 0,
  connectTimeout: parseInt(process.env.MYSQL_CONNECT_TIMEOUT, 10) || 10000
};

const pool = mysql.createPool(DEFAULTS);

/**
 * Ensure the DB is reachable by obtaining and releasing a connection.
 * Retries a few times with exponential backoff if the DB is not yet ready.
 */
async function ensureConnection(retries = 5, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await pool.getConnection();
      await conn.ping();
      conn.release();
      return true;
    } catch (err) {
      console.warn(`MySQL connect attempt ${attempt} failed: ${err.message || err}`);
      if (attempt === retries) throw err;
      // exponential backoff
      await new Promise((r) => setTimeout(r, delay));
      delay = Math.min(30000, delay * 2);
    }
  }
}

module.exports = { pool, ensureConnection };