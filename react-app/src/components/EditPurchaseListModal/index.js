import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPurchaseForm from './EditPurchaseForm';
import '../../components/MyPurchaseList/MyPurchaseList.css'
const EditPurchaseListModal = ({purchase}) =>{
    const [showModal, setShowModal] = useState(false);

    return (
     <>
      <div className="item-description" onClick={() => setShowModal(true)}>
        {purchase.name}</div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditPurchaseForm purchase={purchase} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
}
  

export default EditPurchaseListModal



