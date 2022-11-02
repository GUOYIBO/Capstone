import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddCategoryForm from './AddCategoryForm';

function AddCategoryFormModal({category}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Add Category</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddCategoryForm category={category} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddCategoryFormModal;