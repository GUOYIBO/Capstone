import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { validExtensions } from "../../utils/helper";
import {updateItemTypeThunk } from '../../store/itemType'
import { urlDisplay, onErrorLoadHandler } from '../../utils/helper';

const EditItemTypeForm = ({item, setShowModal}) =>{

    const [name, setName] = useState(item.name);
    const [itemImageFile, setItemFile] = useState(null);
    const [fileChanged, setFileChanged] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const setFile = (e) => {
        const src = URL.createObjectURL(e.target.files[0])
        document.getElementById('previewImg').src = src
        const file = e.target.files[0]
        setItemFile(file)
    }


    useEffect(()=>{
        document.getElementById('previewImg').src = urlDisplay(item?.image_url)
    },[])


    const handleUpdate = async e => {
        e.preventDefault()
        let nameChange = false
        let fileChange = false
        

        let errors = false;
        console.log("name-----", name)
        if(!name || name.trim().length===0){
            errors = true
            alert(`Name is not valid`)
            return
        }

        if (name !==item.name){
            nameChange = true
        }

        if(name.length > 20){
            errors = true;
            alert(`Your input is too long, 20 characters max.`)
            return
        }

        if (itemImageFile){
            fileChange=true
        }

        if (!nameChange && !fileChange){
            setShowModal(false)
            return
        }

       console.log("itemImageFile",  itemImageFile)

       if (itemImageFile && itemImageFile.size > 1024*1024*2){
            errors = true;
            alert(`Your input file is too large, Maximum size 2MB.`)
            return

       }
      // console.log("itemImageFile.name", itemImageFile.name)
        // if (itemImageFile.name&&itemImageFile.name.length >0){
        //     const urlArr = itemImageFile.name.split('.');
        //     const ext = urlArr[urlArr.length-1];
        //     if (!validExtensions.includes(ext.toLocaleLowerCase())){
        //         errors = true
        //         alert(`Image format is invalid. Png, jpg, jpeg, svg allowed. `)
        //         return
        //     }

        // }

        if(errors) return;

        const formData = new FormData()
        formData.append("name", name);
        formData.append("file", itemImageFile)
        console.log("formdata", formData)
         dispatch(updateItemTypeThunk(formData, item.id))
        .then(()=> history.push('/myitemtypes')).then(()=>setShowModal(false))
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
            <div className='form-title'>Edit Item Type</div>
            <form id='create-category-form' onSubmit={handleUpdate}>
                <label className=''>
                    <div className='form-subtitle'>
                    <span >Name</span>
                    </div>
                    <div id='category-name-input' className='form-input'>
                    <input
                        id='1'
                        placeholder='New Item Name'
                        required
                        type='text'
                        value={name}
                        maxLength="20"
                        minLength="5"
                        onChange={e=> setName(e.target.value)}

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
                            <img id='previewImg' className="preview-img"/>
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
export default EditItemTypeForm