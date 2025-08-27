-- Create extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Create discount table
CREATE TABLE IF NOT EXISTS discounts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id VARCHAR(100) NOT NULL,
    description TEXT,
    amount DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insert some sample data
INSERT INTO discounts (product_id, description, amount)
VALUES ('P001', '10% off on electronics', 100.00),
    ('P002', 'Back to school discount', 50.00) ON CONFLICT DO NOTHING;