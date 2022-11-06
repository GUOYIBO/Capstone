import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { useSelector } from 'react-redux';
import AddItemForm from './AddItemForm'

function AddItemsModal() {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
 
  if (!sessionUser){
    return null;
  }
  return (
    <div className='add-btn'>
      <button className ="create-item-btn" onClick={() => setShowModal(true)}>Add Item</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddItemForm  setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default AddItemsModal;