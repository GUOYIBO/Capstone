import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddCategoryForm from './AddCategoryForm';
import { useSelector } from 'react-redux';

function AddCategoryFormModal() {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser){
    return null;
  }
  return (
    <div className='create category'>
      <button className ="create-category-btn" onClick={() => setShowModal(true)}>Add Category</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddCategoryForm  setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default AddCategoryFormModal;