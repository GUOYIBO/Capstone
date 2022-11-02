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
   
    const [allSelected, setAllSelected] = useState({})
    const [currentCategotyIdx, setCurrentCategotyIdx]= useState(0)
    const [currentSelected, setCurrentSelected] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [purchaseDate, setPurchaseDate] = useState('')
    const [expDate, setExpDate] = useState('');
    const [checked, setChecked] = useState(false)

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
        setCurrentCategotyIdx(currentCategotyIdx === length -1 ? 0 : currentCategotyIdx+1)
        if (allSelected[currentCategotyIdx]){

        }

    }

    const prevImage = () =>{
        setCurrentCategotyIdx(currentCategotyIdx === 0? length-1 : currentCategotyIdx-1);
    }


    const handleOnChange = () =>{


    }
    
    const handleSubmit = () =>{

    }


    const setDefault =(id) =>{
        if (allSelected[id]){
            return true;
        }
        return false;
    }

    return (
        <div className="add-image-container">
            <div className="category-image-carousel">
                <FaArrowAltCircleLeft className="left-arrow" onClick={prevImage} />
                <FaArrowAltCircleRight className="right-arrow" onClick={nextImage} />
                {Object.values(categories).map((category, index) =>{
                    return (
                        <div key={category.id} className="image-div-container">
                            <div className={index === currentCategotyIdx ? 'slide-active' : 'slide'}>
                                {index === currentCategotyIdx  &&  <img className='image' src={img1} alt='img1' />}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>

            </div>
            <div className="left-item-selection-container">
                <div className="single-item-container">
                    <span className='item-type-name-title'>Name</span>
                    <span className="input-quantity-title">Qty</span>
                    <span className="input-date-title">Purchase Date</span>
                    <span className="input-date-title">Expiration Date</span>
                </div>
                {currentCategory &&  Object.values(currentCategory.items).sort((a,b) =>a.name-b.name).map(entry =>{
                    return (
                        <div key={entry.id} className="single-item-container">
                            <div className='item-type-name'>
                                <input className="item-checkbox" type='checkbox'  id={entry.id} name= {entry.name} defaultChecked={()=>setDefault(entry.id)}value={entry.name} onChange={()=>handleOnChange(entry.id)}/>
                                <span>{entry.name}</span>
                            </div>
                            <div className="input-quantity">
                                <select className="minimal"  onChange={(e) => setQuantity(e.target.value)}>
                                    <option key="1" value="1">1</option>
                                    <option key="2" value="2">2</option>
                                    <option key="3" value="3">3</option>
                                    <option key="4" value="4">4</option>
                                    <option key="5" value="5">5</option>
                                </select>
                            </div>
                            <div className="input-purchase-date">
                                {/* <span>Purchase date </span> */}
                                <input type="date" id="purchase" name="purchase-date" value="2022-11-05"
                                        min="2022-01-01" max="2022-12-31"/>
                            </div>
                            <div className="input-expiration-date">
                                {/* <span>Expiration date </span> */}
                                <input type="date" id="expiration" name="expiration-date" value="2022-11-11"
                                        min="2022-01-01" max="2022-12-31" /> 
                            </div>
                           
                        </div>
                    )
                })}
            </div>
            <div className="3-button-container">
                <button>Select All</button>
                <button>Reset</button>
                <button onClick={handleSubmit}>Submit</button>
            </div>

        </div>
    )



}

export default AddItems