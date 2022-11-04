import React, { useState } from 'react';
import { Modal } from '../../context/Modal';

import ItemDetail from './ItemDetail';
const ItemDetailModal = (entry) =>{
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <img className="add-purchase-list-button"  src="https://cdn.pixabay.com/photo/2016/03/27/21/59/bread-1284438_1280.jpg" onClick={() => setShowModal(true)} />
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <ItemDetail entry={entry} setShowModal={setShowModal}/>
            </Modal>
          )}
        </>
      );
}
export default ItemDetailModal

