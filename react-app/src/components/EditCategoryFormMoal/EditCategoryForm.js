import './EditCategoryForm.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateACategoryThunk } from '../../store/category';
import { useHistory } from 'react-router-dom';


const EditCategoryForm =({ category, setShowModal }) =>{
    const [editedCatgoryName, setNewCategoryName] = useState(category?.name);
    const [editedCatgoryUrl, setNewCategoryUrl] = useState(category?.image_url);
    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleUpdate = async e => {
        e.preventDefault()

        let errors = false;
        if(!editedCatgoryName.trim().length){
            errors = true
            alert(`Category name can not be empty.`)
        }

        if(editedCatgoryName.length > 20){
            errors = true;
            alert(`Your input is too long, 20 characters max.`)
        }

        if(errors) return;

        const editedCategory ={
            name: editedCatgoryName,
            image_url: editedCatgoryUrl
        }
         dispatch(updateACategoryThunk(editedCategory, category.id))
        .then(()=> history.push('/mycategories')).then(()=>setShowModal(false))
    }


    return (
        <div  className='form-container' >
            <div className='close-button-container'>
                <button aria-label='Close' id="closeButton" className="closebutton" onClick={()=>setShowModal(false)}>
                   <div className="close-icon">
                    <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z" fill="#000000"></path></svg></div>
                </button>
            </div>
            <div className="form-content-container">
            <div className='form-title'>Edit Category</div>
            <form id='create-category-form' onSubmit={handleUpdate}>
                <label className=''>
                    <div className='form-subtitle'>
                    <span >Category Name</span>
                    </div>
                    <div id='category-name-input' className='form-input'>
                    <input
                        id='1'
                        placeholder='new-category'
                        type='text'
                        value={editedCatgoryName}
                        onChange={e=> setNewCategoryName(e.target.value)}
                    />
                    </div>
                </label>
                <label className='add-category-img'>
                    <div className='form-subtitle'>
                    <span >Image Url</span>
                    </div>
                    <div id='category-url-input' className='form-input'>
                    <input
                        id='1'
                        placeholder=''
                        type='text'
                        value={editedCatgoryUrl}
                        onChange={e=> setNewCategoryUrl(e.target.value)}
                    />
                    </div>
                </label>
            </form>

            <div id='dfg' className='form-button'>
                <button id='create-category-btn' onClick={handleUpdate}>
                    Done 
                </button>
            </div>
            </div>
        </div>

    )

}

export default EditCategoryForm