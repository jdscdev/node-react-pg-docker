import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import APIClient from '../../api/APIClient';

const Products = () => {
  const [products, setProducts] = useState([]);
  const API_URL = '/products';

  useEffect(() => {
    APIClient.getAll(API_URL)
      .then(setProducts)
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleAddProduct = async (product) => {
    APIClient.createRecord(API_URL, product)
      .then((newProduct) => {
        setProducts([...products, newProduct]);
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  const handleUpdateProduct = async (product) => {
    APIClient.updateRecord(API_URL, product.id, product)
      .then((updatedProduct) => {
        const updatedProducts = products.map((prod) => (prod.id === product.id ? updatedProduct : prod));
        setProducts(updatedProducts);
      })
      .catch(error => {
        console.error('Error updating product:', error);
      });
  };

  const handleDeleteProduct = async (id) => {
    APIClient.deleteRecord(API_URL, id)
      .then(() => {
        setProducts(products.filter((prod) => prod.id !== id));
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div>
      <h1>Products</h1>
      <ProductForm onAddOrEdit={handleAddProduct} />
      <ProductList onDelete={handleDeleteProduct} onAddOrEdit={handleUpdateProduct} products={products} />
    </div>
  );
};

export default Products;
