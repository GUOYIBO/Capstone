import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditFavDishFom from './EditFavDishForm'

function EditFavDishModal ({favoriteDish}){
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button className="edit-fav-dish-button"  onClick={() => setShowModal(true)}>Eidt</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditFavDishFom favoriteDish ={favoriteDish} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );

}

export default EditFavDishModal
