
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditItemForm from './EditItemForm';
import  {urlDisplay}  from '../../utils/helper';
const EditItemModal = ({item, userItem}) => {

    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <img src={urlDisplay(item.image_url)} className="edit-item-img"  onClick={() => setShowModal(true)}></img>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditItemForm userItem={userItem} setShowModal={setShowModal}/>
                </Modal>
            )}
        </>
    )
}

export default EditItemModal


