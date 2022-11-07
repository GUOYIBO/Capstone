import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import {getAllCategoryThunk} from '../../store/category'
import { useSelector } from "react-redux";
import img1 from '../../image/profileimage.png'
import {FaArrowAltCircleLeft, FaArrowAltCircleRight} from 'react-icons/fa'
import { addUserItemsThunk } from '../../store/item'
import { useHistory } from "react-router-dom";
import {urlDisplay, onErrorLoadHandler} from "../../utils/helper"

const AddItemForm =({setShowModal}) =>{
    const categories = useSelector(state => state.categoryReducer)
    const dispatch = useDispatch()
    const history = useHistory()
    const [currentCategotyIdx, setCurrentCategotyIdx]= useState(0)


    const [checkedState, setCheckedState] = useState({});
    const [qtyState, setQtyState] = useState({});
    const [purchaseDateState, setPurchaseDateState] = useState({})
    const [expDateState, setExpDateState] = useState({})


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
    console.log('check itemcheckbox', checkedState)
    console.log('check quantity', qtyState)
    console.log('check purchase Date', purchaseDateState)
    console.log('check expiration Date', expDateState)
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


    const nextImage = () =>{
        setCurrentCategotyIdx(currentCategotyIdx === length -1 ? 0 : currentCategotyIdx+1)

    }
    const prevImage = () =>{
        setCurrentCategotyIdx(currentCategotyIdx === 0? length-1 : currentCategotyIdx-1);
    }



    const handleReset = (e) =>{
        console.log('handle reset')
        e.preventDefault();
        setCheckedState({});
        setQtyState({});
        setPurchaseDateState({});
        setExpDateState({});
        
    }

    const handleSubmit = async (e) =>{
        const userItemData ={ 
            "item_ids": checkedState, 
            "quantities": qtyState,
            "purchase_date": purchaseDateState,
            "expiration_date": expDateState
        }
        console.log('before submittion', userItemData)
        // await dispatch(addUserItemsThunk(userItemData)).then(()=> history.push('/myitems')).then(()=>setShowModal(false));
        await dispatch(addUserItemsThunk(userItemData)).then(()=>setShowModal(false));  

    }
    const changePurchaseDate = (id,value) =>{
        const newDate = new Date(value).toISOString().substring(0,10)
        setPurchaseDateState(preState => {
            return { 
            ...preState, 
            [id] : newDate
            }
        });
    }

    const changeExpirationDate = (id,value) =>{
        const newDate = new Date(value).toISOString().substring(0,10)
        setExpDateState(preState => {
            return { 
            ...preState, 
            [id] : newDate
            }
        });
    }

    const setCheckedValue =(id) =>{
        if (checkedState[id]){
            return true;
        }
        return false;
    }

    const setQtyValue =(id) =>{
        if (qtyState[id]){
            return qtyState[id];
        }
        return 1;
    }

    const setPurchaseDatedValue =(id) =>{
        if (purchaseDateState[id]){
            return purchaseDateState[id];
        }
        return defaultPurchaseDate;
    }

    const setExpDateValue =(id) =>{
        if (expDateState[id]){
            return expDateState[id];
        }
        return defaultExpDate;
    }

    // const shownCategory =[]
    // if (categories && Object.values(categories).length >0){
    //     for (let i=0; i<Object.values(categories).length; i++){
    //         if (Object.values(categories)[i].items.length>0){
    //             shownCategory.push(Object.values(categories)[i])
    //         }
    //     }
    // }

    return (
        <div className="form-with-img-container">
              <div className='close-button-container'>
                <button aria-label='Close' id="closeButton" className="closebutton" onClick={()=>setShowModal(false)}>
                   <div className="close-icon">
                    <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z" fill="#000000"></path></svg></div>
                </button>
              </div>
            <div className="form-content-container">
            <div className='form-title'>Add item</div>
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
            <div className="single-item-container">
                    <span className='item-type-name-title'>Name</span>
                    <span className="input-quantity-title">Qty</span>
                    <span className="input-date-title">Purchase Date</span>
                    <span className="input-date-title">Expiration Date</span>
            </div>
            <div className="items-selection-container">
                
                {currentCategory &&  Object.values(currentCategory.items).sort((a,b) =>a.name-b.name).map((entry) =>{
                    
                    return (
                        <div key={entry.id} className="single-item-container">
                            <div className='item-type-name'>
                                <input className="item-checkbox" type='checkbox' id={entry.id} name= {entry.name} value={setCheckedValue(entry.id)} checked={setCheckedValue(entry.id)} onChange={()=>handleOnCheckBoxChange(entry.id)}/>
                                <span>{entry.name}</span>
                            </div>
                            <div className="input-quantity">
                                <select className="minimal" value={setQtyValue(entry.id)} onChange={(e) => handleOnQuantityChange(entry.id ,e.target.value)}>
                                    <option key="1" value="1">1</option>
                                    <option key="2" value="2">2</option>
                                    <option key="3" value="3">3</option>
                                    <option key="4" value="4">4</option>
                                    <option key="5" value="5">5</option>
                                </select>
                            </div>
                            <div className="input-purchase-date">
                                {/* <span>Purchase date </span> */}
                                <input type="date" id="purchase" name="purchase-date" value= {setPurchaseDatedValue(entry.id)}  onChange={(e) =>changePurchaseDate(entry.id, e.target.value)} 
                                        min="2022-01-01" max="2022-12-31"/>
                            </div>
                            <div className="input-expiration-date">
                                {/* <span>Expiration date </span> */}
                                <input type="date" id="expiration" name="expiration-date" value= {setExpDateValue(entry.id)}  onChange={(e) =>changeExpirationDate(entry.id, e.target.value)}
                                        min="2022-01-01" max="2022-12-31" />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="button-container">
            <div className="form-button">
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className="form-button">
                <button onClick={handleSubmit}>Submit</button>
            </div>
            </div>
            </div>
        </div>
    )

}

export default AddItemForm