import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import {getAllCategoryThunk} from "../../store/category"
import { addADishThunk } from '../../store/favoriteDish'
import { validExtensions } from "../../utils/helper"
import "./AddFavDishesForm.css"

const AddFavDishesForm = ({setShowModal}) =>{

    const [dishName, setDishName] = useState('')
    const [dishImagUrl, setDishImageUrl] = useState('')
    const [allSelected, setAllSelected] = useState({})
    const categories = useSelector(state => state.categoryReducer)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() =>{
        (async()=> {
            await dispatch(getAllCategoryThunk());
        })();
    },[dispatch])

    if (!categories ){
        return <>Loading...1</>
    }

    if (Object.values(categories).length === 0){
        return (
            <div className="please-create-category">
               <div className="alert-title"> Please create a category and items first! </div>
               <div className="alert-button"> 
                 <button onClick={()=> setShowModal(false)}> Confirm</button>
               </div>

            </div>
        )
    }

    

    const handleOnChange = () => {

        
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        let errors = false;
        if(!dishName.trim().length){
            errors = true
            alert(`Favorite dish name can not be empty.`)
            return
        }

        if(dishName.length > 40){
            errors = true;
            alert(`Your input is too long, 40 characters max.`)
            return
        }

        if(!dishImagUrl.trim().length){
            errors = true
            alert(`Favorite dish image url can not be empty.`)
            return
        }
        if (dishImagUrl.length >0){
            const urlArr = dishImagUrl.split('.');
            const ext = urlArr[urlArr.length-1];
            if (!validExtensions.includes(ext.toLocaleLowerCase())){
                errors = true
                alert(`Favorite dish image format is invalid. Png, jpg, jpeg, svg allowed.`)
                return
            }
        }

        if(errors) return;
        

        const dishData ={ 
            "item_ids": allSelected, 
            "name": dishName,
            "image_url": dishImagUrl
        }
        await dispatch(addADishThunk(dishData)).then(()=> history.push('/myfavoritedishes')).then(()=>setShowModal(false));

    }
    //
    const setDefault = (id) =>{

    }

    const handleOnCheckBoxChange = (itemId) =>{
        if (allSelected[itemId]){
            console.log('handleOnCheckBoxChange', allSelected[itemId])
            allSelected[itemId] = !allSelected[itemId]
        }else{
            setAllSelected(preState => {
                console.log('setCheckedState preState', preState)
                return { 
                  ...preState, 
                  [itemId] : true
                }
              })
        }

    }

    const shownCategory =[]
    if (categories && Object.values(categories).length >0){
        for (let i=0; i<Object.values(categories).length; i++){
            if (Object.values(categories)[i].items.length>0){
                shownCategory.push(Object.values(categories)[i])
            }
        }
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
            <div className='form-title'>Add a dish</div>
            <form id='create-fav-dish-form' onSubmit={handleSubmit}>
                
                <div className="form-subtitle">
                <span id='create-req-star' className='red-text'></span><span className='create-label-text'>Dish Name</span>
                </div>
                <div className='form-input'>
                    <input
                        id='create-fav-dish-name-input'
                        className='create-fav-dish-input'
                        placeholder="Please enter a dish name"
                        type='text'
                        value={dishName}
                        maxLength="40"
                        onChange={e => setDishName(e.target.value)}
                    />
                </div>
            
                <div className="form-subtitle">
                    <span className='create-fav-dish-img-text'>Image Url</span>
                    </div>
                    <div className='form-input'>
                    <input
                        id='create-fav-dish-url-input'
                        className='create-fav-dish-input'
                        placeholder='url here'
                        type='text'
                        value={dishImagUrl}
                        onChange={e => setDishImageUrl(e.target.value)}
                    />
                    </div>
                


                <div className="items-selection-container">
                    {!! Object.values(shownCategory).length && Object.values(shownCategory).map(category =>{
                        return (
                           <div key={category.id} className="category-title">
                                <h3> {category.name}</h3>
                                <div className="item-selection-chbx">
                                    {category.items.map(item =>{
                                        return (
                                            <div key={item.id} className="item-selection-chbx">
                                                <input className="item-checkbox" type='checkbox' id={item.id} name= {item.name} defaultChecked={()=>setDefault(item.id)} value={setDefault(item.id)} onChange={()=>handleOnCheckBoxChange(item.id)}/>
                                                <span>{item.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}

                </div>
                <div id='create-fav-dish-bottom' className='form-button'>
                    <button id='create-fav-dish-btn' onClick={handleSubmit}>
                        Done
                    </button>
                </div>
            </form>
        </div>
    </div>

           
    )
}

export default AddFavDishesForm