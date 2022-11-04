import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCategoryForm from './EditCategoryForm';
import './EditCategoryForm.css'

function EditCategoryFormModal({category}) {
  const [showModal, setShowModal] = useState(false);
  

  return (
    <>
      <button className="edit-category-button"  onClick={() => setShowModal(true)}>Edit</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCategoryForm category={category} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditCategoryFormModal;