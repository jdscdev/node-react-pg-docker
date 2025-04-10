// Must come first!
jest.mock('pg', () => {
  const mClient = {
    query: jest.fn(),
    connect: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => mClient) };
});

const request = require('supertest');
const express = require('express');
const productsRouter = require('../../routes/products');
const { Pool } = require('pg'); // mocked

const app = express();
app.use(express.json());
app.use('/api/products', productsRouter);

// Access the mocked pool
const pool = new Pool();

describe('Product Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Read', () => {
    test('GET /api/products returns 500 on error', async () => {
      pool.query.mockRejectedValue(new Error('Database error'));

      const res = await request(app).get('/api/products');

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({});
    });

    test('GET /api/products returns products', async () => {
      const mockProducts = { rows: [{ id: 1, name: 'Test Product', price: 100 }] };
      pool.query.mockResolvedValue(mockProducts);

      const res = await request(app).get('/api/products');

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockProducts.rows);
      expect(pool.query).toHaveBeenCalledWith('SELECT * FROM products');
    });
  });

  describe('Create', () => {
    test('POST /api/products returns 400 on missing name', async () => {
      const newProduct = { price: 100 };
      const res = await request(app).post('/api/products').send(newProduct);
      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({});
      expect(pool.query).not.toHaveBeenCalled();
    });

    test('POST /api/products creates a product', async () => {
      const newProduct = { name: 'Phone', price: 500 };
      const mockResult = { rows: [{ id: 2, ...newProduct }] };
      pool.query.mockResolvedValue(mockResult);

      const res = await request(app).post('/api/products').send(newProduct);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockResult.rows[0]);
      expect(pool.query).toHaveBeenCalledWith(
        'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
        [newProduct.name, newProduct.price]
      );
    });
  });

  describe('Update', () => {
    test('PUT /api/products/:id updates a product', async () => {
      const updatedProduct = { name: 'Updated Product', price: 150 };
      const mockResult = { rows: [{ id: '1', ...updatedProduct }] };
      pool.query.mockResolvedValue(mockResult);

      const res = await request(app).put('/api/products/1').send(updatedProduct);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockResult.rows[0]);
      expect(pool.query).toHaveBeenCalledWith(
        'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
        [updatedProduct.name, updatedProduct.price, '1']
      );
    });
  });

  describe('Delete', () => {
    test('DELETE /api/products/:id deletes a product', async () => {
      pool.query.mockResolvedValue({});

      const res = await request(app).delete('/api/products/1');

      expect(res.statusCode).toBe(204);
      expect(pool.query).toHaveBeenCalledWith('DELETE FROM products WHERE id = $1', ['1']);
    });
  });
});
