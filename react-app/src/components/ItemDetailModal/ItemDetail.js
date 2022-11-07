import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateItemThunk} from '../../store/item'
import './ItemDetail.css'
import { useEffect } from "react"

const ItemDetail = ({entry, setShowModal}) =>{

    const dispatch = useDispatch()
    console.log('Item detail entry', entry)
    const [qty, setQty] = useState(entry.entry.quantity)
    const [purchaseDate, setPurchaseDate] = useState(entry.entry.purchase_date.substring(0,10))
    const [expDate, setExpDate] = useState(entry.entry.expiration_date.substring(0,10))
    const [errors, setErrors] = useState([])
    console.log ('entry item', entry)

    useEffect(()=>{
        let validationErrors = [];
        if (purchaseDate.length>0 && expDate.length >0){
            console.log('aaaa' )
            if (new Date(purchaseDate) > new Date(new Date().toISOString().substring(0,10))){
                validationErrors.push("Item purchase date can not be greater than today ")
            }
            if (new Date(purchaseDate)> new Date(expDate)){
                validationErrors.push("Item purchase date can not be greater than expiration date ")    
            }
            if (new Date(expDate) < new Date(new Date().toISOString().substring(0,10))){
                validationErrors.push("Item expiration date can not be in the past ")
            }
            if (new Date(purchaseDate) > new Date(expDate)){
                validationErrors.push ("Item purchase date can not be greater than expiration date ")
            }
        }
        setErrors(validationErrors)
    },[purchaseDate, expDate])

    console.log("errors" , errors)
    const incQty = (e) =>{
        e.preventDefault()
        if(qty<12){
            setQty(qty+1)
        }
        return
    }

    const decQty = (e) =>{
        e.preventDefault()
        if (qty > 1) {
            setQty(qty-1);
        }
        return
    }

    const changePurchaseDate = (value) =>{
        const newDate = new Date(value).toISOString().substring(0,10)
        
        setPurchaseDate(value)
    }

    const chageExpDate = (value) =>{
        const newDate = new Date(value).toISOString().substring(0,10)
        
        setExpDate(value)
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        if (errors.length > 0){
            alert(errors);
            return
        }
        console.log("qty", qty)
        console.log("purchaseDate", purchaseDate)
        console.log("expDate", expDate)
        const itemData = {
            "quantity" : qty,
            "purchase_date": new Date(purchaseDate).toISOString().substring(0,10),
            "expiration_date": new Date(expDate).toISOString().substring(0,10)
        }
        await (dispatch(updateItemThunk(+entry.entry.id, itemData))).then(()=> setShowModal(false))

    }

    return (
        <div>
            <div className="form-container">
            <div className='close-button-container'>
                <button aria-label='Close' id="closeButton" className="closebutton" onClick={()=>setShowModal(false)}>
                   <div className="close-icon">
                    <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z" fill="#000000"></path></svg></div>
                </button>
            </div>
            <div className="form-content-container">
            <div className='form-title'>Edit item</div>
            <div className="form-subtitle">{entry.entry.item.name}</div>
            <form>

                <div className="edit-quantity-container">
                <div className="form-subtitle">Quantity</div>
                    <div className="edit-quantity">
                    <button onClick={decQty}>-</button>
                        <div className="quantity-num">{qty}</div>
                    <button onClick={incQty}>+</button>
                </div>
                </div>
                <div className="edit-quantity-container">
                    <div className="edit-date">
                <div className="form-subtitle">Purchase Date</div> </div>
                    <input type="date" id="purchase" name="purchase-date" value={purchaseDate} 
                    onChange={(e) =>changePurchaseDate(e.target.value)} min="2022-11-01" max="2025-12-31"/>
               
                </div>
                <div className="edit-quantity-container">
                <div className="edit-date">
                    <div className="form-subtitle">Expiration Date</div></div>
                    <input type="date" id="exp" name="expiration-date" value={expDate} 
                    onChange={(e) =>chageExpDate(e.target.value)} min="2022-11-01" max="2025-12-31"/>
               </div>
                <div id='create-botton' className='form-button'>
                    <button id='create-dish-btn' onClick={handleSubmit}>
                        Done
                    </button>
                </div>
                
            </form>
            </div>
            </div>
        </div>
        
        
    )
}

export default ItemDetail