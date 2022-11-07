import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditFavDishFom from './EditFavDishForm'
import { urlDisplay, onErrorLoadHandler } from '../../utils/helper';
function EditFavDishModal ({dish}){
    const [showModal, setShowModal] = useState(false);

    return (
      <>
      <div className="item-img">
        <img onError={onErrorLoadHandler} src={urlDisplay(dish.image_url)}  className="edit-fav-dish-button"  onClick={() => setShowModal(true)}></img>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditFavDishFom dish ={dish} setShowModal={setShowModal}/>
          </Modal>
        )}
        </div>
      </>
    );

}

export default EditFavDishModal
