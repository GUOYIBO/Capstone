import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import RecommendationForm from './RecommendationForm';
import { useSelector } from 'react-redux';
import { MdRecommend } from "react-icons/md"

function RecommendationModal() {
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);
  if (!sessionUser){
    return null;
  }
  return (
    <div className='todays-recommendation'>
      <button className ="recommend-button" onClick={() => setShowModal(true)}>
            <MdRecommend className="recommendation-icon"></MdRecommend>
            <div className="recommendation-btn-text">Today's Recommendation </div>
      </button>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <RecommendationForm  setShowModal={setShowModal}/>
        </Modal>
      )}
    </div>
  );
}

export default RecommendationModal;