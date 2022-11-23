import { useDispatch } from "react-redux"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import {getAllCategoryThunk} from '../../store/category'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'
import { onErrorLoadHandler, urlDisplay } from "../../utils/helper"
import {createItemTypeThunk} from '../../store/itemType'
const AddItemTypeForm = ({setShowModal}) =>{
    const categories = useSelector(state => state.categoryReducer)
    const dispatch = useDispatch()
    const [currentCategotyIdx, setCurrentCategotyIdx]= useState(0)
    const [itemTypeName, setItemTypeName] = useState('');
    const [itemImageFile, setItemFile] = useState(null);
    const [errors, setErrors] = useState([])

    useEffect(() =>{
        (async()=> {
            await dispatch(getAllCategoryThunk());
        })();
    },[dispatch])

    if (!categories || Object.values(categories).length === 0){
        return <>Loading...</>
    }

    const length = Object.values(categories).length;
    const currentCategory = Object.values(categories)[currentCategotyIdx]
    

    const nextImage = () =>{
        setCurrentCategotyIdx(currentCategotyIdx === length -1 ? 0 : currentCategotyIdx+1)

    }
    const prevImage = () =>{
        setCurrentCategotyIdx(currentCategotyIdx === 0? length-1 : currentCategotyIdx-1);
    }


    const setFile = (e) => {
        const file = e.target.files[0]
        setItemFile(file)
      }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log('select file', itemImageFile)
        const formData = new FormData()
        formData.append("name", itemTypeName);
        formData.append("file", itemImageFile)

        // const itemTypeData ={ 
        //     "name": itemTypeName, 
        //     "file": itemImageFile,
    
        // }
        await dispatch(createItemTypeThunk(currentCategory.id, formData)).then(()=>setShowModal(false))

        
  
    }

    return (
        <div className="form-with-img-container">
        <div className='close-button-container'>
          <button aria-label='Close' id="closeButton" className="closebutton" onClick={()=>setShowModal(false)}>
             <div className="close-icon">
              <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z" fill="#000000"></path></svg></div>
          </button>
        </div>
      <div className="form-content-container">
      <div className='form-title'>Select a category</div>
      <div className="category-image-carousel">
          <FaArrowAltCircleLeft className="left-arrow" onClick={prevImage} />
          <FaArrowAltCircleRight className="right-arrow" onClick={nextImage} />
          {Object.values(categories).map((category, index) =>{
              return (
                  <div key={category.id} className="image-div-container">
                      <div className={index === currentCategotyIdx ? 'slide-active' : 'slide'}>
                          {index === currentCategotyIdx  &&  <img onError={onErrorLoadHandler} className='image' src={urlDisplay(category.image_url)} alt='img1' />}
                      </div>
                  </div>
              )
          })}
      </div>
     
           <form id='create-category-form' onSubmit={handleSubmit}>
                <div className="form-subtitle">
                    <span>Item Name</span>
                </div>
                <div className='add-err-r-messages'>
              {errors.map((error, idx) =>{
                  <div key={idx}>{error}</div>
              })}
           </div>
                <div id='item-type-name-input' className='form-input'>
                    <input
                        id='1'
                        placeholder='new item name'
                        type='text'
                        value={itemTypeName}
                        maxLength="20"
                        minLength="5"
                        onChange={e=> setItemTypeName(e.target.value)}
                    />
                    </div>
                    <div className="form-subtitle">
                        <span>Select Image </span>
                    </div>
                    <div id='category-url-input' className='form-input'>
                    <input
                        id='browse-file'
                        className='create-fav-dish-input'
                        placeholder='please select an image'
                        type='file'
                        onChange={setFile}
                    />
                    </div>
            </form>


      <div className="button-container">
      <div className="form-button">
          <button onClick={()=> setShowModal(false)}>Cancel</button>
      </div>
      <div className="form-button">
          <button onClick={handleSubmit}>Submit</button>
      </div>
      </div>
      </div>
  </div>
)

}

export default AddItemTypeForm