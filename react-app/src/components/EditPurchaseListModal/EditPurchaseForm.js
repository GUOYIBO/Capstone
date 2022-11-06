import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePurchaseListThunk } from '../../store/purchaseList'

const EditPurchaseForm = ({purchase, setShowModal}) =>{
    console.log("edit purchase", purchase)

    const [editedPurchaseListName, setPurchaseListyName] = useState(purchase?.name);
    const [editedPurchaseListContent, setPurchaseListContent] = useState(purchase?.content);
    const dispatch = useDispatch()

    const handleUpdate = async (e) => {
        e.preventDefault()

        let errors = false;
        if(!editedPurchaseListName.trim().length){
            errors = true
            alert(`Purchase list name can not be empty.`)
        }

        if(editedPurchaseListName.length > 20){
            errors = true;
            alert(`Your input is too long, 20 characters max.`)
        }

        if(errors) return;

        const editedPList ={
            name: editedPurchaseListName,
            content: editedPurchaseListContent
        }
         dispatch(updatePurchaseListThunk(editedPList, purchase.id)).then(()=>setShowModal(false))
    }
    

    return (
        
        <div>
            <div className='form-title'>Edit Purchase List</div>
            <form onSubmit={handleUpdate}>
                <lable>
                <div className='form-subtitle'>
                    <span >Purchase List Name</span>
                    </div>
                    <div id='p-list-name-input' className='form-input'>
                    <input
                        placeholder='purchase list name'
                        type='text'
                        value={editedPurchaseListName}
                        onChange={e=> setPurchaseListyName(e.target.value)}
                    />
                    </div>
                </lable>

                <label className='edit-purchase-list-name'>
                    <div className='form-subtitle'>
                    <span >Image Url</span>
                    </div>
                    <div id='purchase-list-content-input' className='form-input'>
                    <textarea
                        id='1'
                        placeholder=''
                        type='textarea'
                        value={editedPurchaseListContent}
                        onChange={e=> setPurchaseListContent(e.target.value)}
                    />
                    </div>
                </label>
                <div>
                </div>

            </form>
            <div id='dfg' className='form-button'>
                <button id='edit-purchase-list-btn' onClick={handleUpdate}>
                    Done 
                </button>
            </div>
        </div>
    )

}

export default EditPurchaseForm