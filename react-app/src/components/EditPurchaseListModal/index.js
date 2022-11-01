import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPurchaseForm from './EditPurchaseForm';
const EditPurchaseListModal = ({purchase}) =>{
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button className="edit-purchase-list-button"  onClick={() => setShowModal(true)}>Edit</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditPurchaseForm purchase={purchase} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
}
  

export default EditPurchaseListModal



