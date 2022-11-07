import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import {urlDisplay, onErrorLoadHandler} from "../../utils/helper"

import ItemDetail from './ItemDetail';
const ItemDetailModal = (entry) =>{
  //console.log("item entry", entry)
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <div className='item-img'>
          
          <img onError={onErrorLoadHandler} src={urlDisplay(entry.entry.item.image_url)} onClick={() => setShowModal(true)}/>
        
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <ItemDetail entry={entry} setShowModal={setShowModal}/>
            </Modal>
          )}
          </div>
        </>
      );
}
export default ItemDetailModal

