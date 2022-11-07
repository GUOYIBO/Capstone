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
        <div id='form-container' className='form-container'>
        <div className='close-button-container'>
                <button aria-label='Close' id="closeButton" className="closebutton" onClick={()=>setShowModal(false)}>
                   <div className="close-icon">
                    <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z" fill="#000000"></path></svg></div>
                </button>
            </div>
            <div className="form-content-container">
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
                    <span >Description</span>
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
        </div>
    )

}

export default EditPurchaseForm