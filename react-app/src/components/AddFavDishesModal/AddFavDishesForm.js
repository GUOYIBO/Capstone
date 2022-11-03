import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import {getAllCategoryThunk} from "../../store/category"

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

    if (!categories || Object.values(categories).length === 0){
        return <>Loading...</>
    }

    console.log('setCheckedState ', allSelected)

    const handleOnChange = () => {

        
    }

    const handleSubmit =() =>{

    }

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

    return (
        <div id='create-fav-dish-form-container' className=''>
        
            <form id='create-fav-dish-form' onSubmit={handleSubmit}>
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
            </form>
    </div>

           
    )
}

export default AddFavDishesForm