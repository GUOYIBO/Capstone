import './AddPurchaseListForm.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPurchaseListThunk } from '../../store/purchaseList';
import { useHistory } from 'react-router-dom';


const AddPurchaseListForm =({ setShowModal }) =>{
    const [newPurchaseListyName, setNewPurchaseListName] = useState('');
    const [newPurchaseListContent, setNewPurchaseListContent] = useState('');
    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleCreate = async e => {
        e.preventDefault()

        let errors = false;
        if(!newPurchaseListyName.trim().length){
            errors = true
            alert(`Purchase list name can not be empty.`)
        }

        if(newPurchaseListyName.length > 20){
            errors = true;
            alert(`Your input is too long, 20 characters max.`)
        }

        
        if(!newPurchaseListContent.trim().length){
            errors = true
            alert(`Purchase list description can not be empty.`)
        }

        if(errors) return;

        const newPurchaseList ={
            name: newPurchaseListyName,
            content: newPurchaseListContent
        }
         dispatch(createPurchaseListThunk(newPurchaseList))
        .then(()=> history.push('/mypurchaselists')).then(()=>setShowModal(false))
    }


    return (
        <div id='form-container' className='form-container'>
        <div className='close-button-container'>
                <button aria-label='Close' id="closeButton" className="closebutton" onClick={()=>setShowModal(false)}>
                   <div className="close-icon">
                    <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z" fill="#000000"></path></svg></div>
                </button>
            </div>
            <div className="form-content-container">
            <div className='form-title'>Create Purchase List</div>
            <form id='create-purchase-list-form' onSubmit={handleCreate}>
                <div className='form-subtitle'>
                    <span>Purchase List Name</span></div>
    
                    <div id='purcharse-list-name-input' className='form-input'>
                    <input
                        id='1'
                        placeholder='name'
                        type='text'
                        value={newPurchaseListyName}
                        maxLength="20"
                        onChange={e=> setNewPurchaseListName(e.target.value)}
                    />
                    </div>
            
                <div className='form-subtitle'>
                <div className='form-subtitle'>
                    <span>Description</span>
                </div>
                    <div id='category-url-input' className='form-input'>
                    <textarea
                        id='1'
                        placeholder='description...'
                        type='textarea'
                        maxLength="400"
                        value={newPurchaseListContent}
                        onChange={e=> setNewPurchaseListContent(e.target.value)}/>
                    </div>
                </div>
            </form>

            <div className='form-button'>
                <button id='create-category-btn' onClick={handleCreate}>
                    Done
                </button>
            </div>
            </div>
        </div>

    )

}

export default AddPurchaseListForm