import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProductForm = ({ onAddOrEdit, product }) => {
  console.log("ProductForm", product); 
  const [changedProduct, setChangedProduct] = useState(product);

  useEffect(() => {
    setChangedProduct(product); // update local state when prop changes
  }, [product]);

  const buttonText = product.id ? "Edit Product" : "Add Product";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAddOrEdit(changedProduct);
    setChangedProduct({ id: 0, name: '', price: 0 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangedProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="id"
        type="hidden"
        value={changedProduct.id}
        readOnly
      />
      <input
        name="name"
        type="text"
        placeholder="Product Name"
        value={changedProduct.name}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        min="0"
        step="0.01"
        value={changedProduct.price}
        onChange={handleChange}
        required
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

ProductForm.propTypes = {
  onAddOrEdit: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  })
};

export default ProductForm;
