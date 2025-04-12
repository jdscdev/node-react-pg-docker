import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ModalWindow from '../generic/ModalWindow';
import ProductForm from './ProductForm';

const ProductList = ({ onDelete, onAddOrEdit, products }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ id: 0, name: '', price: 0 });

  const handleEditClick = (prod) => {
    setSelectedProduct(prod);
    setShowModal(true);
  };

  const handleSubmitModal = async (prod) => {
    await onAddOrEdit(prod);
    setShowModal(false);
  };

  return (
    <>
      <ul>
        {products.map((prod) => (
          <li key={`prod_id_${prod.id}`}>
            {prod.name} - ${prod.price}
            <button onClick={() => handleEditClick(prod)}>Edit</button>
            <button onClick={() => onDelete(prod.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Only one modal rendered here */}
      <ModalWindow show={showModal} handleClose={() => setShowModal(false)}>
        <h2>Edit Product</h2>
        <ProductForm onAddOrEdit={handleSubmitModal} product={selectedProduct} />
      </ModalWindow>
    </>
  );
};

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onAddOrEdit: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ProductList;
