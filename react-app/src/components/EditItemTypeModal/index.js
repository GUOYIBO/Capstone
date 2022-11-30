import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditItemTypeForm from './EditItemTypeForm';
import './EditItemTypeForm.css'
import { urlDisplay, onErrorLoadHandler } from '../../utils/helper';

function EditItemTypeModal({item}) {
  const [showModal, setShowModal] = useState(false);
  

  return (
    <>
      <img onError={onErrorLoadHandler} src={urlDisplay(item.image_url)} className="edit-category-button"  onClick={() => setShowModal(true)}></img>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditItemTypeForm item={item} setShowModal={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default EditItemTypeModal;