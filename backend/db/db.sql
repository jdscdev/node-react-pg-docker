CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL
);

INSERT INTO products (name, price) VALUES
('Product 1', 10.00),
('Product 2', 20.00);
