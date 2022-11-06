import './AddCategoryForm.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createACategoryThunk } from '../../store/category';
import { useHistory } from 'react-router-dom';
import '../EditFavDishModal/EditFavDishForm'


const AddCategoryForm =({ setShowModal }) =>{
    const [newCatgoryName, setNewCategoryName] = useState('');
    const [newCatgoryUrl, setNewCategoryUrl] = useState('');
    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleCreate = async e => {
        e.preventDefault()

        let errors = false;
        if(!newCatgoryName.trim().length){
            errors = true
            alert(`Category name can not be empty.`)
        }

        if(newCatgoryName.length > 20){
            errors = true;
            alert(`Your input is too long, 20 characters max.`)
        }

        if(errors) return;

        const newCategory ={
            name: newCatgoryName,
            image_url: newCatgoryUrl
        }
         dispatch(createACategoryThunk(newCategory))
        .then(()=> history.push('/mycategories')).then(()=>setShowModal(false))
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
            <div className='form-title'>Add category</div>
            <form id='create-category-form' onSubmit={handleCreate}>
                <div className="form-subtitle">
                    <span >Category Name</span>
                </div>
                <div id='category-name-input' className='form-input'>
                    <input
                        id='1'
                        placeholder='new category'
                        type='text'
                        value={newCatgoryName}
                        onChange={e=> setNewCategoryName(e.target.value)}
                    />
                    </div>
                    <div className="form-subtitle">
                        <span>Image Url</span>
                    </div>
                    <div id='category-url-input' className='form-input'>
                    <input
                        id='1'
                        className='create-fav-dish-input'
                        placeholder='please type a valid url'
                        type='text'
                        value={newCatgoryUrl}
                        onChange={e=> setNewCategoryUrl(e.target.value)}
                    />
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

export default AddCategoryForm
