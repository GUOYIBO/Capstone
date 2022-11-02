import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import img from '../../image/profileimage.png'
import img1 from '../../image/login.png'
import './Main.css'
import { getAllFavoriteDishesThunk} from '../../store/favoriteDish'
import { getAllCategoryThunk} from '../../store/category'
import { getAllPurchaseListsThunk} from '../../store/purchaseList'
import { getAllItemsThunk } from '../../store/item'
import { Modal } from "../../context/Modal"
import { EditItemForm } from '../../'

const Main = () => {

    const sessionUser = useSelector(state => state.session.user)
    const items = useSelector(state => state.itemReducer)
    const categories = useSelector(state => state.categoryReducer)
    const favoriteDishes = useSelector(state => state.categoryReducer);
    const purchaseList = useSelector(state => state.purchaseList)
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    console.log("category ####", categories)
    console.log("items ####", items)

    useEffect(()=>{
        (async()=> {
            await dispatch(getAllFavoriteDishesThunk());
            await dispatch(getAllCategoryThunk());
            await dispatch(getAllItemsThunk());
            await dispatch(getAllPurchaseListsThunk());
          })();

    },[dispatch])
    

    if (!sessionUser){
        return <div>Loading...</div>;
    }


    const categoryArr = Object.values(categories).map((cat, index) =>{
        return (
            <div key={index} className="category-detail">
                <div className="category-img">
                    <img  src={img}></img>
                </div>
                <div  className="category-name">{cat.name}</div>
            </div>   
        )
    })
    const itemsArr = Object.values(items).map((entry) =>{
        console.log('////item////', entry)
        return (
            <div className="item-detail" key={entry.id} >
                <div className="item-img">
                <img src={img1}></img>
                    {/* <img src={entry.item.image_url}></img> */}
                </div>
                <div className="name-qty-container">
                    <div className="item-name"> {entry.item.name} </div>
                    <div className="item-quantity"> QTY {entry.quantity} </div>
                </div>
            </div>
        )
    })
    return (
        <div className="main-container">
            <div className="nav-category-container">
            <div className="current-item-title">Category</div>
                {categoryArr}
            </div>
            <div className="content-container">
                <div className="filter">
                 <div className="filter-title">Filter</div>
                    <div className="expires-container"> 
                        <div className="subtitle">Expires in days</div>
                        <div className="button-list">
                        <div>
                            <button className="filter-button">3</button>
                        </div>
                        <div>
                            <button className="filter-button">5 </button>
                         </div>
                         <div>
                            <button className="filter-button">7</button>
                        </div>
                        </div>
                        
                </div>
                <div>
                    <div className="subtitle">Purchase Date</div>
                    <input type="date" id="purchase" name="purchase-date" value="2022-10-31"
                    min="2021-01-01" max="2022-12-31"/>
                </div>
            </div>
             <div className="items-container"> 
                <div className="current-item-title">Current Items</div>
                
                <div className="items-list">{itemsArr}</div>
            </div>
            </div>
        </div>
    )

}

export default Main