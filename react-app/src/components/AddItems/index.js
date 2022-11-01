import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import {getAllCategoryThunk} from '../../store/category'
import { useSelector } from "react-redux";
import img1 from '../../image/profileimage.png'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'
import './AddItems.css'

const AddItems = () =>{
    const categories = useSelector(state => state.categoryReducer)
    const dispatch = useDispatch()
   
    const [allSelected, setAllSelected] = useState([])
    const [currentCategotyIdx, setCurrentCategoty]= useState(0)
    const [currentSelected, setCurrentSelected] = useState({})

    useEffect(() =>{
        (async()=> {
            await dispatch(getAllCategoryThunk());
        })();
    },[dispatch])

    if (!categories || Object.values(categories).length === 0){
        return <>Loading...</>
    }
    const length = Object.values(categories).length;
    console.log("=======category", categories)
    const currentCategory = Object.values(categories)[currentCategotyIdx]


    const nextImage = () =>{
        setCurrentCategoty(currentCategotyIdx === length -1 ? 0 : currentCategotyIdx+1)
    }

    const prevImage = () =>{
        setCurrentCategoty(currentCategotyIdx === 0? length-1 : currentCategotyIdx-1);
    }
    
    const handleSubmit = () =>{

    }

    return (
        <div className="add-image-container">
            <div className="category-image-carousel">
                <FaArrowAltCircleLeft className="left-arrow" onClick={prevImage} />
                <FaArrowAltCircleRight className="right-arrow" onClick={nextImage} />
                {Object.values(categories).map((category, index) =>{
                    return (
                        <div key={category.id} className="image-div-container">
                            <div className={index === currentCategotyIdx ? 'slide active' : 'slide'}>
                                {index === currentCategotyIdx  &&  <img className='image' src={img1} alt='img1' />}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>

            </div>
            <div className="left-item-selection-container">
                {currentCategory &&  Object.values(currentCategory.items).sort((a,b) =>a.name-b.name).map(entry =>{
                    return (
                        <div key={entry.id}>
                            <div className='item-type-name'>
                            <label>{entry.name}</label>
                                <input type='checkbox'/>
                            </div>
                            <div className="input-purchase-date">
                                <label>Purchase date </label>
                                <input type="date" id="purchase" name="purchase-date" value="2022-11-05"
                                        min="2022-01-01" max="2022-12-31"/>
                            </div>
                            <div className="input-expiration-date">
                                <label>Expiration date </label>
                                <input type="date" id="purchase" name="expiration-date" value="2022-11-11"
                                        min="2022-01-01" max="2022-12-31" /> 
                            </div>
                            <div className="input-quantity">
                                <select className="minimal" >
                                    <option key="1" value="1">1</option>
                                    <option key="2" value="2">2</option>
                                    <option key="3" value="3">3</option>
                                    <option key="4" value="4">4</option>
                                    <option key="5" value="5">5</option>
                                </select>
                            </div>
                        </div>
                    )
                })}

            </div>
            <div className="3-button-container">
                <button>Select All</button>
                <button>Reset</button>
                <button onClick={handleSubmit}>Add</button>
            </div>

        </div>
    )



}

export default AddItems