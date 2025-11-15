-- Ordering API DB initialization script
-- Adjust database name and user/password as needed before running.
-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS `ordersdb` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Create an application user (change username/password to secure values).
-- If you already have a MySQL user, skip the CREATE USER/GRANT steps.
CREATE USER IF NOT EXISTS 'orders_user' @'%' IDENTIFIED BY 'orders_pass';
GRANT ALL PRIVILEGES ON `ordersdb`.* TO 'orders_user' @'%';
FLUSH PRIVILEGES;
-- Optionally: create the orders table here as well (the app's init() will create it automatically),
-- but including it allows one-shot DB provisioning.
USE `ordersdb`;
CREATE TABLE IF NOT EXISTS `orders` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `userId` VARCHAR(255),
    `items` JSON,
    `total` DECIMAL(10, 2),
    `status` VARCHAR(50) DEFAULT 'PENDING',
    `idempotency_key` VARCHAR(255) NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- Create unique index for idempotency key (works in MySQL; if you have existing NULLs, this will still succeed)
CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_idempotency ON `orders` (`idempotency_key`);