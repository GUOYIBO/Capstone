import './AddCategoryForm.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createACategoryThunk } from '../../store/category';
import { useHistory } from 'react-router-dom';
import '../EditFavDishModal/EditFavDishForm'
import { validExtensions } from '../../utils/helper';


const AddCategoryForm =({ setShowModal }) =>{
    const [newCatgoryName, setNewCategoryName] = useState('');
    const [newCatgoryFile, setNewCategoryFile] = useState(null);

    const dispatch = useDispatch()
    const history = useHistory()


   
   
    const handleCreate = async e => {
        e.preventDefault()

        let errors = false;
        if(!newCatgoryName.trim().length){
            errors = true
            alert(`Category name is not valid.`)
            return
        }

        if(newCatgoryName.length > 20){
            errors = true;
            alert(`Your input is too long, 20 characters max.`)
            return
        }

        // if(newCatgoryUrl.trim().length==0){
        //     errors = true
        //     alert(`Category image url can not be empty.`)
        //     return
        // }

        console.log("newCatgoryUrl", typeof newCatgoryFile)

        if (!newCatgoryFile || newCatgoryFile.name.length ===0){
            alert("Image is not valid")
            return;
        }

        if (newCatgoryFile.length >0){
            const urlArr = newCatgoryFile.name.split('.');
            const ext = urlArr[urlArr.length-1];
            if (!validExtensions.includes(ext.toLocaleLowerCase())){
                errors = true
                alert(`Category image format is invalid. Png, jpg, jpeg, svg allowed. `)
                return
            }
           

        }

        if(errors) return;

        const formData = new FormData()
        formData.append("name", newCatgoryName);
        formData.append("file", newCatgoryFile)
         dispatch(createACategoryThunk(formData))
        .then(()=> history.push('/mycategories')).then(()=>setShowModal(false))
    }

    const setFile = (e) => {
        const file = e.target.files[0]
        setNewCategoryFile(file)
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
                        maxLength="20"
                        minLength="5"
                        onChange={e=> setNewCategoryName(e.target.value)}
                    />
                    </div>
                    <div className="form-subtitle">
                        <span>Select Image</span>
                    </div>
                    <div id='category-url-input' className='form-input'>
                    <input
                        id='browse-file'
                        className='create-fav-dish-input'
                        placeholder='pplease select an image'
                        type='file'
                        accept="image/*"
                        onChange={setFile}
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
