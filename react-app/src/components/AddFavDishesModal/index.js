import React, { useState } from 'react';
import AddFavDishesForm from './AddFavDishesForm';
import { Modal } from '../../context/Modal';


function AddFavDishesModal({category}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="add-fav-dish-button"  onClick={() => setShowModal(true)}>Add Favorite Dish</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddFavDishesForm setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddFavDishesModal;


