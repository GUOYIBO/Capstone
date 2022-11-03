import './AddPurchaseListForm.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPurchaseListThunk } from '../../store/purchaseList';
import { useHistory } from 'react-router-dom';


const AddPurchaseListForm =({ setShowModal }) =>{
    const [newPurchaseListyName, setNewPurchaseListName] = useState('new-purchase-list');
    const [newPurchaseListContent, setNewPurchaseListContent] = useState('');
    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleCreate = async e => {
        e.preventDefault()

        let errors = false;
        if(!newPurchaseListyName.trim().length){
            errors = true
            alert(`Purchase-list name can not be empty.`)
        }

        if(newPurchaseListyName.length > 20){
            errors = true;
            alert(`Your input is too long, 20 characters max.`)
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
        <div  className='gggg' >
            <div className='dfgdg'>Create Purchase List</div>
            <form id='create-purchase-list-form' onSubmit={handleCreate}>
                <label className=''>
                    <span className='create-label-text'>Purchase List Name</span>
    
                    <div id='purcharse-list-name-input' className=''>
                    <input
                        id='1'
                        className='dgdg'
                        placeholder='new-purchase-list'
                        type='text'
                        value={newPurchaseListyName}
                        onChange={e=> setNewPurchaseListName(e.target.value)}
                    />
                    </div>
                </label>
                <label className='add-category-img'>
                    <span className='create-label-text'>Image Url</span>
                
                    <div id='category-url-input' className=''>
                    <input
                        id='1'
                        className='dgdg'
                        placeholder='please type a valid url'
                        type='TextArea'
                        value={newPurchaseListContent}
                        onChange={e=> setNewPurchaseListContent(e.target.value)}
                    />
                    </div>
                </label>
            </form>

            <div id='dfg' className='flx-row'>
                <button id='create-category-btn' onClick={handleCreate}>
                    Create Purchase List
                </button>
            </div>

        </div>

    )

}

export default AddPurchaseListForm