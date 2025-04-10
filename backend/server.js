const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Route imports
const productsRouter = require('./routes/products');

// Mount routes
app.use('/api/products', productsRouter);

app.listen(5000, () => console.log('Server running on port 5000'));
