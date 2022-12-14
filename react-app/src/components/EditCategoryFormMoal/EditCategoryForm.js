import './EditCategoryForm.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateACategoryThunk } from '../../store/category';
import { useHistory } from 'react-router-dom';
import { validExtensions } from '../../utils/helper';
import { urlDisplay, onErrorLoadHandler } from '../../utils/helper';
import { useEffect } from 'react';


const EditCategoryForm =({ category, setShowModal }) =>{
    const [editedCatgoryName, setNewCategoryName] = useState(category?.name);
    const [categoryFile, setNewCategoryFile] = useState(null);
    const dispatch = useDispatch()
    const history = useHistory()


    const setFile = (e) => {
        const src = URL.createObjectURL(e.target.files[0])
        document.getElementById('previewCatGoryImg').src = src
        const file = e.target.files[0]
        setNewCategoryFile(file)
    }
    useEffect(()=>{
        document.getElementById('previewCatGoryImg').src = urlDisplay(category?.image_url)
    },[])
    
    const handleUpdate = async e => {
        e.preventDefault()

        let nameChange = false
        let fileChange = false

        let errors = false;
        if(!editedCatgoryName || editedCatgoryName.trim().length===0){
            errors = true
            alert(`Category name is not valid.`)
            return
        }
        if (editedCatgoryName !== category.name){
            nameChange = true;
        }

        if(editedCatgoryName.length > 20){
            errors = true;
            alert(`Your input is too long, 20 characters max.`)
            return
        }
     
        if(categoryFile){
            fileChange = true
        }

        if (!nameChange && !fileChange){
            setShowModal(false)
            return
        }

        if (categoryFile && categoryFile.size > 1024*1024*2){
            errors = true;
            alert(`Your input file is too large, Maximum size 2MB.`)
            return

       }

        if(errors) return;

        // const editedCategory ={
        //     name: editedCatgoryName,
        //     image_url: editedCatgoryUrl
        // }
        const formData = new FormData()
        formData.append("name", editedCatgoryName);
        formData.append("file", categoryFile)
         dispatch(updateACategoryThunk(formData, category.id))
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
                        maxLength="20"
                        minLength="5"
                        onChange={e=> setNewCategoryName(e.target.value)}
                    />
                    </div>
                </label>
                <label className='add-category-img'>
                    <div className='form-subtitle'>
                    <span >Image </span>
                    </div>
                    <div id='category-url-input' >
                            {/* <label htmlFor="browse-file">Upload</label> */}
                            <input
                                id='browse-file'
                                placeholder='please select an image'
                                type='file'
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={setFile}
                            />
                            <img id='previewCatGoryImg' className="preview-img"/>
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