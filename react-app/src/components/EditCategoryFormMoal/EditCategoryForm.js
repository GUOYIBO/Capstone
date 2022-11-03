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
        <div  className='gggg' >
            <div className='dfgdg'>Edit Category</div>
            <form id='create-category-form' onSubmit={handleUpdate}>
                <label className=''>
                    <span className='create-label-text'>Category Name</span>
    
                    <div id='category-name-input' className=''>
                    <input
                        id='1'
                        className='dgdg'
                        placeholder='new-category'
                        type='text'
                        value={editedCatgoryName}
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
                        placeholder=''
                        type='text'
                        value={editedCatgoryUrl}
                        onChange={e=> setNewCategoryUrl(e.target.value)}
                    />
                    </div>
                </label>
            </form>

            <div id='dfg' className='flx-row'>
                <button id='create-category-btn' onClick={handleUpdate}>
                    Edit 
                </button>
            </div>

        </div>

    )

}

export default EditCategoryForm