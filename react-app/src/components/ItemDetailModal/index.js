import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import {urlDisplay} from "../../utils/helper"

import ItemDetail from './ItemDetail';
const ItemDetailModal = (entry) =>{
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <img className="add-purchase-list-button"  src={urlDisplay("bread.png")} onClick={() => setShowModal(true)} />
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <ItemDetail entry={entry} setShowModal={setShowModal}/>
            </Modal>
          )}
        </>
      );
}
export default ItemDetailModal

