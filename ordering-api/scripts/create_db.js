#!/usr/bin/env node
/**
 * Helper script to create the orders database and optional app user.
 * Usage:
 *  - Set environment variables or place them in the ordering-api/.env file
 *  - Run: node scripts/create_db.js
 *
 * Environment variables used (defaults shown):
 *  MYSQL_HOST (127.0.0.1)
 *  MYSQL_PORT (3306)
 *  MYSQL_ROOT_USER (root)
 *  MYSQL_ROOT_PASSWORD (required if your server needs auth)
 *  MYSQL_DATABASE or MYSQL_DB (ordersdb)
 *  ORDER_DB_USER (orders_user)
 *  ORDER_DB_PASS (orders_pass)
 */

const mysql = require('mysql2/promise');

const HOST = process.env.MYSQL_HOST || '127.0.0.1';
const PORT = process.env.MYSQL_PORT || 3306;
const ROOT_USER = process.env.MYSQL_ROOT_USER || process.env.MYSQL_USER || 'root';
const ROOT_PASS = process.env.MYSQL_ROOT_PASSWORD || process.env.MYSQL_PASSWORD || 'Oyugi222f';
const DB_NAME = process.env.MYSQL_DATABASE || process.env.MYSQL_DB || 'ordersdb';
const APP_USER = process.env.ORDER_DB_USER || 'orders_user';
const APP_PASS = process.env.ORDER_DB_PASS || 'orders_pass';

async function run() {
  if (!ROOT_PASS) {
    console.warn('Warning: No root password provided. If your MySQL requires auth, set MYSQL_ROOT_PASSWORD or MYSQL_PASSWORD.');
  }

  console.log(`Connecting to MySQL ${HOST}:${PORT} as ${ROOT_USER} ...`);

  const conn = await mysql.createConnection({ host: HOST, port: PORT, user: ROOT_USER, password: ROOT_PASS });
  try {
    console.log(`Creating database ${DB_NAME} if not exists...`);
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);

    console.log(`Creating application user ${APP_USER} (if not exists) and granting privileges...`);
    // Note: using string interpolation for identifiers; these values should be trusted in a dev/local environment.
    await conn.query(`CREATE USER IF NOT EXISTS '${APP_USER}'@'%' IDENTIFIED BY '${APP_PASS}'`);
    await conn.query(`GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${APP_USER}'@'%'`);
    await conn.query('FLUSH PRIVILEGES');

    console.log('Creating orders table (idempotent)...');
    await conn.query(`
      USE \`${DB_NAME}\`;
      CREATE TABLE IF NOT EXISTS \`orders\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`userId\` VARCHAR(255),
        \`items\` JSON,
        \`total\` DECIMAL(10,2),
        \`status\` VARCHAR(50) DEFAULT 'PENDING',
        \`idempotency_key\` VARCHAR(255) NULL,
        \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log('Attempting to create unique index on idempotency key (errors ignored)');
    try {
      await conn.query("CREATE UNIQUE INDEX idx_orders_idempotency ON \`orders\` (idempotency_key)");
    } catch (err) {
      // index may already exist or engine/version doesn't support IF NOT EXISTS for indexes — ignore
    }

    console.log('Database provisioning completed.');
  } finally {
    await conn.end();
  }
}

run().catch(err => {
  console.error('Failed to provision DB:', err.message || err);
  process.exit(1);
});
