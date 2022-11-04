import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {getAllCategoryThunk} from '../../store/category'
import { useState } from "react"


const EditFavDishFom = ({dish}) =>{

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
        //TODO
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

    return (
        <div>
            <label className='create-fav-dish-label'>
                <span id='create-server-req-star' className='red-text'>*</span><span className='create-server-label-text'>Dish Name</span>
                    <input
                        id='create-fav-dish-name-input'
                        className='create-fav-dish-input'
                        placeholder="Please enter a dish name"
                        type='text'
                        value={dishName}
                        onChange={e => setDishName(e.target.value)}
                    />
                    {/* <span className={`server-icon-err-msg red-text`}>{serverIconErrMsg} &nbsp;</span> */}
                </label>
                <label className='create-fav-dish-img-label'>
                    <span className='create-fav-dish-img-text'>Image URL</span>
                    <input
                        id='create-fav-dish-url-input'
                        className='create-fav-dish-input'
                        placeholder='url here'
                        type='text'
                        value={dishImagUrl}
                        onChange={e => setDishImageUrl(e.target.value)}
                    />
                    {/* <span className={`server-name-length ${serverNameLengthErr}`}>{newServerName.length}</span> */}
                </label>

                <div className="items-selection-container">
                    {!! Object.values(categories).length && Object.values(categories).map(category =>{
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
                <div id='create-server-bottom' className='flx-row'>
                    <button id='create-server-btn' onClick={handleSubmit}>
                        Create
                    </button>
                </div>
        </div>
    )
}

export default EditFavDishFom