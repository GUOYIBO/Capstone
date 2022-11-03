import './AddCategoryForm.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createACategoryThunk } from '../../store/category';
import { useHistory } from 'react-router-dom';


const AddCategoryForm =({ setShowModal }) =>{
    const [newCatgoryName, setNewCategoryName] = useState('new-category');
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
        <div  className='gggg' >
            <div className='dfgdg'>Add Category</div>
            <form id='create-category-form' onSubmit={handleCreate}>
                <label className=''>
                    <span className='create-label-text'>Category Name</span>
    
                    <div id='category-name-input' className=''>
                    <input
                        id='1'
                        className='dgdg'
                        placeholder='new-category'
                        type='text'
                        value={newCatgoryName}
                        onChange={e=> setNewCategoryName(e.target.value)}
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
                        type='text'
                        value={newCatgoryUrl}
                        onChange={e=> setNewCategoryUrl(e.target.value)}
                    />
                    </div>
                </label>
            </form>

            <div id='dfg' className='flx-row'>
                <button id='create-category-btn' onClick={handleCreate}>
                    Create Category
                </button>
            </div>

        </div>

    )

}

export default AddCategoryForm