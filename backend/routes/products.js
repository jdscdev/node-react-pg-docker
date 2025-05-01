const express = require('express');
const router = express.Router();
const prisma = require('../prisma/prismaClient');

// GET all products
router.get('/', async (_, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    return res.status(500).json({ error: `Database error ${err.message}` });
  }
});

// POST a new product
router.post('/', async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price || isNaN(price)) {
    return res.status(400).json({ error: 'Invalid product Name or Price' });
  }
  
  try {
    const newProduct = await prisma.product.create({
      data: { name, price: parseFloat(price) },
    });
    res.status(201).json(newProduct);
  } catch (err) {
    return res.status(500).json({ error: `Database error ${err.message}` });
  }
});

// PUT a product
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;

  if (!name || !price || isNaN(price)) {
    return res.status(400).json({ error: 'Invalid product Name or Price' });
  }
  
  try {
    const updatedProduct = await prisma.product.update({
      data: { name, price: parseFloat(price) },
      where: { id: parseInt(id) }
    });
    res.status(200).json(updatedProduct);
  } catch (err) {
    return res.status(500).json({ error: `Database error ${err.message}` });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
  
  try {
    await prisma.product.delete({
      where: { id: parseInt(id) }
    });
    return res.status(200).json({ message: 'Product deleted successfully' });
  }
  catch (err) {
    return res.status(500).json({ error: `Database error ${err.message}` });
  }
});

module.exports = router;
