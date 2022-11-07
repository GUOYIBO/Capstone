import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import {getAllCategoryThunk} from '../../store/category'
import { useSelector } from "react-redux";
import img1 from '../../image/profileimage.png'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'
import { addUserItemsThunk } from '../../store/item'
import './AddItems.css'
import { useHistory } from "react-router-dom";
import {urlDisplay, onErrorLoadHandler} from "../../utils/helper"




const AddItems = () =>{
    const categories = useSelector(state => state.categoryReducer)
    const dispatch = useDispatch()
    const history = useHistory()

    const [currentCategotyIdx, setCurrentCategotyIdx]= useState(0)
    const [errors, setErrors] = useState([])

    // const itemCheckedObj = {}
    // const qtyObj = {}
    // const purchaseDateObj = {}
    // const expirationDateObj = {}

    const [checkedState, setCheckedState] = useState({});
    const [qtyState, setQtyState] = useState({});
    const [purchaseDateState, setPurchaseDateState] = useState({})
    const [expDateState, setExpDateState] = useState({})

    console.log("errors1 ", errors)


    useEffect(() =>{
        (async()=> {
            await dispatch(getAllCategoryThunk());
        })();
    },[dispatch])


    useEffect(()=>{
        let validationErrors = [];
        if (Object.keys(purchaseDateState).length>0){
            Object.keys(purchaseDateState).map(entry =>{
                if (new Date(purchaseDateState[entry]) > new Date(new Date().toISOString.substring(0,10))){
                    validationErrors.push(entry + " purchase date can not be earlier than today")
                }
                if (expDateState[entry] && new Date(purchaseDateState[entry])> new Date(expDateState[entry])){
                    validationErrors.push(entry+ " purchase date can not be earlier than expiration date")
                }
            })
        }

        if (Object.keys(expDateState).length >0){
            Object.keys(expDateState).map(entry =>{
                if (new Date(expDateState(entry)) < new Date(new Date().toISOString.substring(0,10))){
                    validationErrors.push(entry +" expiration date can not be earlier than today")
                }
                if (purchaseDateState[entry] && new Date(purchaseDateState[entry]) > new Date(expDateState[entry])){
                    validationErrors.push (entry + "purchase date can not be earlier than expiration date")
                }
            })
        }
        setErrors(validationErrors)
    },[purchaseDateState, expDateState])

    if (!categories || Object.values(categories).length === 0){
        return <>Loading..2.</>
    }
    const length = Object.values(categories).length;
    const currentCategory = Object.values(categories)[currentCategotyIdx]
    console.log('check itemcheckbox', checkedState)
    console.log('check quantity', qtyState)
    console.log('check purchase Date', purchaseDateState)
    console.log('check expiration Date', expDateState)
    console.log("errors ", errors)
    const current = new Date()
    const defaultPurchaseDate = current.toISOString().substring(0,10)
    const futureDate = current
    futureDate.setDate(current.getDate()+5)
    const defaultExpDate = futureDate.toISOString().substring(0,10)

   
    const handleOnCheckBoxChange = (id) =>{
        if (checkedState[id]){
            console.log('handleOnCheckBoxChange', checkedState[id])
            checkedState[id] = !checkedState[id]
        }else{
            setCheckedState(preState => {
                console.log('setCheckedState preState', preState)
                return { 
                  ...preState, 
                  [id] : true
                }
              })
        }
    }
    const handleOnQuantityChange = (itemId ,value) =>{
       
        setQtyState(preState => {
            return { 
              ...preState, 
              [itemId] : value
            }
          });
        console.log("qtyState...",qtyState)
    }

    const handleCancel = () =>{
        clearCurrentSelectd();
    }

    const clearCurrentSelectd = () =>{
        // setQtyState(new Array(Object.values(currentCategory.items).length).fill(1))
        // setCheckedState(new Array(Object.values(currentCategory.items).length).fill(false))
    }


    const nextImage = () =>{
        setCurrentCategotyIdx(currentCategotyIdx === length -1 ? 0 : currentCategotyIdx+1)

    }
    const prevImage = () =>{
        setCurrentCategotyIdx(currentCategotyIdx === 0? length-1 : currentCategotyIdx-1);
    }

    const handleSelectAll = () =>{

    }

    const handleRest = () =>{
        
    }

    const handleSubmit = async (e) =>{
        console.log('HIHIHIHIHIIH-----------')
        e.preventDefault();
        let validationErrors = [];
        if (Object.keys(purchaseDateState).length>0){
            console.log("keysssss",Object.keys(purchaseDateState))
            Object.keys(purchaseDateState).map(entry =>{
                console.log("new date1", new Date(purchaseDateState[entry] ))
                if (new Date(purchaseDateState[entry]) > new Date(new Date().toISOString.substring(0,10))){
                    validationErrors.push(entry + " purchase date can not be earlier than today")
                }
                if (expDateState[entry] && new Date(purchaseDateState[entry])> new Date(expDateState[entry])){
                    validationErrors.push(entry+ " purchase date can not be earlier than expiration date")
                }
            })
        }

        if (Object.keys(expDateState).length >0){
            Object.keys(expDateState).map(entry =>{
                if (new Date(expDateState(entry)) < new Date(new Date().toISOString.substring(0,10))){
                    validationErrors.push(entry +" expiration date can not be earlier than today")
                }
                if (purchaseDateState[entry] && new Date(purchaseDateState[entry]) > new Date(expDateState[entry])){
                    validationErrors.push (entry + "purchase date can not be earlier than expiration date")
                }
            })
        }
       
        if (validationErrors.length>0){
            setErrors(validationErrors)
            return
        }
        const userItemData ={ 
            "item_ids": checkedState, 
            "quantities": qtyState,
            "purchase_date": purchaseDateState,
            "expiration_date": expDateState
        }
        await dispatch(addUserItemsThunk(userItemData)).then(()=> history.push('/main'));



    }
    const changePurchaseDate = (id,value) =>{
        console.log('id, e', id, value);
        const newDate = new Date(value).toISOString().substring(0,10)
        setPurchaseDateState(preState => {
            return { 
              ...preState, 
              [id] : newDate
            }
          });
    }

    const changeExpirationDate = (id,value) =>{
        console.log('id, e', id, value);
        const newDate = new Date(value).toISOString().substring(0,10)
        setExpDateState(preState => {
            return { 
              ...preState, 
              [id] : newDate
            }
          });
    }



    const setDefault =(id) =>{
       
        if (checkedState[id]){
            console.log('set to true', id)
            return true;
        }
        console.log('set to false', id)
        return false;
    }

    return (
        <div className="add-image-container">
            <div className="category-image-carousel">
                <FaArrowAltCircleLeft className="left-arrow" onClick={prevImage} />
                <FaArrowAltCircleRight className="right-arrow" onClick={nextImage} />
                {Object.values(categories).map((category, index) =>{
                    console.log("category, index", category, index)
                    return (
                        <div key={category.id} className="image-div-container">
                            <div className={index === currentCategotyIdx ? 'slide-active' : 'slide'}>
                                {index === currentCategotyIdx  &&  <img onError={onErrorLoadHandler} className='image' src={urlDisplay(category.image_url)} alt='img1' />}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div>

            </div>
            <div className="item-selection-container">
                <div className='add-err-r-messages'>
                    {errors.map((error, idx) =>{
                        <div key={idx}>{error}</div>
                    })}
                 </div>
                <div className="single-item-container">
                    <span className='item-type-name-title'>Name</span>
                    <span className="input-quantity-title">Qty</span>
                    <span className="input-date-title">Purchase Date</span>
                    <span className="input-date-title">Expiration Date</span>
                </div>
                {currentCategory &&  Object.values(currentCategory.items).sort((a,b) =>a.name-b.name).map((entry) =>{
                    
                    return (
                        <div key={entry.id} className="single-item-container">
                            <div className='item-type-name'>
                                <input className="item-checkbox" type='checkbox' id={entry.id} name= {entry.name} defaultChecked={setDefault(entry.id)} value={setDefault(entry.id)} onChange={()=>handleOnCheckBoxChange(entry.id)}/>
                                <span>{entry.name}</span>
                            </div>
                            <div className="input-quantity">
                                <select className="minimal"  defaultValue="1" value={qtyState[entry.id]} onChange={(e) => handleOnQuantityChange(entry.id ,e.target.value)}>
                                    <option key="1" value="1">1</option>
                                    <option key="2" value="2">2</option>
                                    <option key="3" value="3">3</option>
                                    <option key="4" value="4">4</option>
                                    <option key="5" value="5">5</option>
                                    <option key="6" value="6">6</option>
                                    <option key="7" value="7">7</option>
                                    <option key="8" value="8">8</option>
                                    <option key="9" value="9">9</option>
                                    <option key="10" value="10">10</option>
                                    <option key="11" value="11">11</option>
                                    <option key="12" value="12">12</option>
                                </select>
                            </div>
                            <div className="input-purchase-date">
                                {/* <span>Purchase date </span> */}
                                <input type="date" id="purchase" name="purchase-date" value= {purchaseDateState[entry.id]} defaultValue={defaultPurchaseDate} onChange={(e) =>changePurchaseDate(entry.id, e.target.value)} 
                                        min="2022-01-01" max="2025-12-31"/>
                            </div>
                            <div className="input-expiration-date">
                                {/* <span>Expiration date </span> */}
                                <input type="date" id="expiration" name="expiration-date" value= {expDateState[entry.id]} defaultValue={defaultExpDate} onChange={(e) =>changeExpirationDate(entry.id, e.target.value)}
                                        min="2022-01-01" max="2025-12-31" />
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