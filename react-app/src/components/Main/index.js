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
import ItemDetailModal from "../../components/ItemDetailModal"
import { FaImages } from "react-icons/fa"
import {urlDisplay} from "../../utils/helper"

const Main = () => {

   

    const sessionUser = useSelector(state => state.session.user)
    const items = useSelector(state => state.itemReducer)
    const categories = useSelector(state => state.categoryReducer)
    // const favoriteDishes = useSelector(state => state.categoryReducer);
    // const purchaseList = useSelector(state => state.purchaseList)

    const current = new Date()
    const defaultPurchaseDate = current.toISOString().substring(0,10)
    const dispatch = useDispatch();
    const [categoryFilter, setCategoryFilter] = useState(0)
    const [purDateFilter, setPurDateFilter] = useState('') // set filter condition
    const [expInDaysFilter, setExpInDaysFilter] = useState([])
    const [purchaseDate, setPurchaseDate] = useState(defaultPurchaseDate) //set display

    // console.log("category ####", categories)
    // console.log("items ####", items)

    useEffect(()=>{
        (async()=> {
            await dispatch(getAllFavoriteDishesThunk());
            await dispatch(getAllCategoryThunk());
            await dispatch(getAllItemsThunk());
            await dispatch(getAllPurchaseListsThunk());
          })();

    },[dispatch])
    

    if (!sessionUser){
        return <div>Loading...!!!!!!</div>;
    }

    const handleFilter = (categoryId) =>{
        console.log(categoryId)
        setCategoryFilter(categoryId)
    }
    const handleReset = () =>{
        console.log('RESET!!!')
        setCategoryFilter(0)
        setPurDateFilter('')
        setPurchaseDate(defaultPurchaseDate) 
        setExpInDaysFilter([])
    }
    

    const changePurchaseDate = (value) =>{
        
        const newDate = new Date(value).toISOString().substring(0,10)
        setPurDateFilter(newDate)
        setPurchaseDate(newDate)
    }

    const categoryArr = Object.values(categories).map((cat, index) =>{
        return (
            <div key={index} className="single-category">
                <div  className="category-detail">
                    <div className="category-img">
                        <img  src={urlDisplay(cat.image_url)} onClick={()=>handleFilter(cat.id)}></img>
                    </div>
                    <div className="category-image-divider"></div>
                    <div  className="category-name">{cat.name}</div>
                </div>   
                <div className="category-divider"></div>
            </div>
        )
    })
    
    let filteredDateArray = []
    console.log('categoryFilter', categoryFilter)
    console.log('purDateFilter', purDateFilter)
    let arr = Object.values(items)
    console.log('arr.length', arr)
    for (let i=0; i<arr.length; i++){
        let itemPurchaseDate = arr[i].purchase_date.substring(0,10)
        console.log("arr purchase date", itemPurchaseDate)
        if (categoryFilter != 0 ){
            if (categoryFilter === arr[i].item.category_id) {
                filteredDateArray.push(arr[i])
                continue;
            }
        }
        
        else if(purDateFilter.length>0){
            if (itemPurchaseDate === purDateFilter){
                filteredDateArray.push(arr[i])
                continue;
            }
        } 
        else{
            filteredDateArray =arr;
            break;
        }
    }
    console.log('filteredArray', filteredDateArray)
    const itemsArr = filteredDateArray.map((entry) =>{
         console.log('////item////', entry)
        const expInDays = (new Date(entry.expiration_date.substring(0,10))-new Date(new Date().toISOString().substring(0,10))) /(1000*60*60*24)
        return (
            <div className="item-detail" key={entry.id} >
                <div className="item-img-container">
                    <div className="item-img">
                     < ItemDetailModal entry={entry} />
                    {/* <img src={entry.item.image_url}></img> */}
                    </div>
                   
                    <div className="quantiy-inline">
                       <div className="quantiy"> {entry.quantity } </div>
                    </div>
                </div>
                <div className="name-qty-container">
                    <div className="item-name"> {entry.item.name} </div>
                    <span> Expires in {expInDays} days</span>
                    {/* <div className="item-quantity"> QTY {entry.quantity} </div> */}
                </div>
            </div>
        )
    })
    return (
        <div className="main">
            <div className="header"></div>
        <div className="main-container">
            <div className="category-container">
                <div className="category-list-container">
                   {categoryArr}
                </div>
            </div>
            <div className="content-container">
                <div className="filter">
                    <div className="filter-title">All Items</div>
                        <div>
                            <button className="filter-reset" onClick={handleReset}>Reset</button>
                        </div>
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
                    <input type="date" id="purchase" name="purchase-date" value={purchaseDate} 
                    onChange={(e) =>changePurchaseDate(e.target.value)} min="2022-11-01" max="2022-12-31"/>
                </div>
            </div>
    
                {/* <div className="current-item-title">Current Items</div> */}
                
                <div className="items-list">{itemsArr}</div>

            </div>
            </div>
        </div>
    )

}

export default Main