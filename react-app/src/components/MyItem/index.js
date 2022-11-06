import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { deleteItemThunk, getAllItemsThunk } from "../../store/item";
import ItemDetailModal from "../ItemDetailModal";
import './MyItem.css'
import AddItemsModal from "../AddItemsModal";
import { FaTrashAlt } from "react-icons/fa";
const MyItems = () =>{


    const dispatch = useDispatch();
    const items = useSelector(state => state.itemReducer);
    const history = useHistory()
    useEffect(()=>{
        (async()=> {
        
            await dispatch(getAllItemsThunk());
          })();

    },[dispatch])
    
    if (!items || Object.values(items).length===0){
        return (
            <div>
               <h1> Loading...</h1>
            </div>
        )
    }
    const handleDelete = async (id) => {
        console.log('delete item id', id)
        if (window.confirm('Are you sure you want to delete this item?')){
            await dispatch(deleteItemThunk(+id)).then(()=>history.push('/myitems'))
        }
      }
    
    const itemsArr = Object.values(items).map((entry) =>{
        //console.log('------item----- from myitems', entry)
        return (
            <div className="item-detail" key={entry.id} >
                <div className="item-img-container">
                    {/* <div className="item-img"> */}
                        <ItemDetailModal entry={entry}/>
                    {/* </div> */}
                   
                    <div className="quantiy-inline">
                       <div className="quantiy"> {entry.quantity }</div>
                       <div className="delete-white-icon"> 
                            <FaTrashAlt onClick={()=>handleDelete(entry.id)}/>
                        </div>
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
        <div className="items-container"> 
                <div className="current-item-title">Manage Items</div>
                <AddItemsModal />
                
                <div className="my-items-list">{itemsArr}</div>
            </div>
    )
}

export default MyItems;