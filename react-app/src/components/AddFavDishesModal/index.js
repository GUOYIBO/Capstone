import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddFavDishesForm from './AddFavDishesForm';

function AddFavDishesModal({category}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="edit-category-button"  onClick={() => setShowModal(true)}>Add Favorite Dish</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddFavDishesForm category={category} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddFavDishesModal;