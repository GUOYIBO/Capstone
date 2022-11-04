import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditFavDishFom from './EditFavDishForm'

function EditFavDishModal ({dish}){
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button className="edit-fav-dish-button"  onClick={() => setShowModal(true)}>Eidt</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditFavDishFom dish ={dish} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );

}

export default EditFavDishModal
