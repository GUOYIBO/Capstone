import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {updateADishThunk} from '../../store/favoriteDish'
import { getAllCategoryThunk} from '../../store/category'

import { useState } from "react"
import './EditFavDishForm.css'


const EditFavDishFom = ({dish, setShowModal}) =>{

    console.log("get favorite dish from parent", dish)

     
    const [dishName, setDishName] = useState(dish?.name)
    const [dishImagUrl, setDishImageUrl] = useState(dish?.image_url)
    const [allSelected, setAllSelected] = useState(() =>{
        let obj = {}
        if (dish && Object.values(dish.items).length>0){
            Object.values(dish.items).map(item =>{
                obj[item.id] = true;
            })
        }
        return obj
    })
    const categories = useSelector(state => state.categoryReducer)
    const dispatch = useDispatch()
    console.log ("get all selected ", allSelected);

    useEffect(()=>{
        (async()=> {
            await dispatch(getAllCategoryThunk());
        })();

    },[dispatch])


    if (!categories || Object.values(categories).length ===0){
        return (
            <div>Loading...</div>
        )
    }

    const setDefault =(id) =>{
        if (allSelected[id]){
            //console.log('set to true', id)
            return true;
        }
        //console.log('set to false', id)
        return false;
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log ("ALL SELECTED", allSelected)
        const dishData = {
            "item_ids" : allSelected
        }
        await dispatch(updateADishThunk(+dish.id, dishData)).then(() => setShowModal(false))

    }
    const handleOnCheckBoxChange = (id) =>{
        if (allSelected[id]){
            console.log('handleOnCheckBoxChange', allSelected[id])
            allSelected[id] = !allSelected[id]
        }else{
            setAllSelected(preState => {
                console.log('setAllSelected preState', preState)
                return { 
                  ...preState, 
                  [id] : true
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
        <div className="form-container">
            <div className='close-button-container'>
                <button aria-label='Close' id="closeButton" className="closebutton" onClick={()=>setShowModal(false)}>
                   <div className="close-icon">
                    <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z" fill="#000000"></path></svg></div>
                </button>
            </div>
            <div className="form-content-container">
            <div className='form-title'>Edit Dish</div>
            <div className='create-fav-dish-label'>
                <div className="form-subtitle">
                 <span id='create-dish-star' className='red-text'>* </span><span>Dish Name</span>
                </div>
                <div className='form-input'>
                    <input
                        id='create-fav-dish-name-input'
                        placeholder="Please enter a dish name"
                        type='text'
                        value={dishName}
                        onChange={e => setDishName(e.target.value)}
                    />
                    </div>
                    
                </div>
                <div className='create-fav-dish-img-label'>
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
                    
                </div>  

                <div className="items-selection-container">
                    {(shownCategory).map(category =>{
        
                        return (
                           <div key={category.id} className="category-title">
                                <h3> {category.name}</h3>
                                <div className="item-selection-list">
                                    {Object.values(category.items).length >0&& category.items.map(item =>{
                                        return (
                                            <div key={item.id} className="item-selection-chbx">
                                                <input className="item-checkbox" type='checkbox' id={item.id} name= {item.name} defaultChecked={setDefault(item.id)} value={setDefault(item.id)} onChange={()=>handleOnCheckBoxChange(item.id)}/>
                                                <span>{item.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div id='create-botton' className='form-button'>
                    <button id='create-dish-btn' onClick={handleSubmit}>
                        Done
                    </button>
                </div>
                </div>
        </div>
    )
}

export default EditFavDishFom