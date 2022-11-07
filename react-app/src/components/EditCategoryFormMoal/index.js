import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCategoryForm from './EditCategoryForm';
import './EditCategoryForm.css'
import { urlDisplay, onErrorLoadHandler } from '../../utils/helper';

function EditCategoryFormModal({category}) {
  const [showModal, setShowModal] = useState(false);
  

  return (
    <>
      <img onError={onErrorLoadHandler} src={urlDisplay(category.image_url)} className="edit-category-button"  onClick={() => setShowModal(true)}></img>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCategoryForm category={category} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditCategoryFormModal;