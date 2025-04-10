const express = require('express');
const router = express.Router();
const { pool } = require('../db/dbconnection');

// GET all products
router.get('/', async (_, res) => {
  const result = await pool.query('SELECT * FROM products');
  res.json(result.rows);
});

// POST a new product
router.post('/', async (req, res) => {
  const { name, price } = req.body;

  if (!name || price == null) {
    throw new Error('Name and price are required', 400);
  }
  
  const result = await pool.query(
    'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
    [name, price]
  );
  res.json(result.rows[0]);
});

// PUT a product
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || price == null) {
    throw new Error('Name and price are required', 400);
  }
  
  const result = await pool.query(
    'UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *',
    [name, price, id]
  );
  res.json(result.rows[0]);
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
    
  if (!id || isNaN(id)) {
    throw new Error('Invalid product ID', 400);
  }
  
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
  res.sendStatus(204);
});

module.exports = router;
