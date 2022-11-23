import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddItemTypeForm from './AddItemTypeForm';
import { useSelector } from 'react-redux';

function AddItemTypeModal() {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser){
    return null;
  }
  return (
    <div className='create-item-type'>
      <button className ="create-item-type-btn" onClick={() => setShowModal(true)}>Create New Item Type</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddItemTypeForm  setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default AddItemTypeModal;