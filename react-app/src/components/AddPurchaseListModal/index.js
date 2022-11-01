import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddPurchaseListForm from './AddPurchaseListForm'
const AddPurchaseListModal = () =>{
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <button className="add-purchase-list-button"  onClick={() => setShowModal(true)}>Add Purchase List</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <AddPurchaseListForm  setShowModal={setShowModal}/>
            </Modal>
          )}
        </>
      );
}
export default AddPurchaseListModal

