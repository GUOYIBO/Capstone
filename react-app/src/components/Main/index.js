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
    const dispatch = useDispatch();
    const [categoryFilter, setCategoryFilter] = useState(0)
    const [purDateFilter, setPurDateFilter] = useState('')
    const [expInDaysFilter, setExpInDaysFilter] = useState([])

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

    const handleFilter = (categoryId) =>{
        console.log(categoryId)
        setCategoryFilter(categoryId)
    }
    const handleReset = (e) =>{
        e.preventDefault();
        setCategoryFilter(0)
        setPurDateFilter('')
        setExpInDaysFilter([])
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
    
    let filteredArray = []
    console.log('categoryFilter', categoryFilter)
    let arr = Object.values(items)
    for (let i=0; i<arr.length; i++){
        let itemPurchaseDate = arr[i].purchase_date.substring(0,10)
        if (categoryFilter != 0 ){
            if (categoryFilter === arr[i].item.category_id) {
                filteredArray.push(arr[i])
                continue;
            }
        }
        // else if (){
        //TODO  exp days
        // }
        else if(purDateFilter.length>0){
            if (itemPurchaseDate === purDateFilter){
                filteredArray.push(arr[i])
                continue;
            }
        } 
        else{
            filteredArray =arr;
            break;
        }
    }
    console.log('filteredArray', filteredArray)
    const itemsArr = filteredArray.map((entry) =>{
        console.log('////item////', entry)
        return (
            <div className="item-detail" key={entry.id} >
                <div className="item-img-container">
                    <div className="item-img">
                     < ItemDetailModal entry={entry} />
                    {/* <img src={entry.item.image_url}></img> */}
                    </div>
                   
                    <div className="quantiy-inline">
                       <div className="quantiy"> {entry.quantity } Remaining</div>
                    </div>
                </div>
                <div className="name-qty-container">
                    <div className="item-name"> {entry.item.name} </div>
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
                    <div className="filter-title">All items</div>
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
                    <input type="date" id="purchase" name="purchase-date" value="2022-10-31"
                    min="2021-01-01" max="2022-12-31"/>
                </div>
            </div>
             <div> 
                <div className="current-item-title">Current Items</div>
                
                <div className="items-list">{itemsArr}</div>
            </div>
            </div>
            </div>
        </div>
    )

}

export default Main