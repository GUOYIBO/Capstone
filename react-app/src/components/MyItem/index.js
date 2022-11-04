import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllItemsThunk } from "../../store/item";
import ItemDetailModal from "../ItemDetailModal";
const MyItems = () =>{


    const dispatch = useDispatch();
    const items = useSelector(state => state.itemReducer);
   
    useEffect(()=>{
        (async()=> {
        
            await dispatch(getAllItemsThunk());
          })();

    },[dispatch])
    
    if (!items || Object.values(items).length===0){
        return (
            <div>Loading...</div>
        )
    }
    
    const itemsArr = Object.values(items).map((entry) =>{
        console.log('------item----- from myitems', entry)
        return (
            <div className="item-detail" key={entry.id} >
                <div className="item-img-container">
                    <div className="item-img">
                        <ItemDetailModal entry={entry}/>
                      {/* <img src="https://cdn.pixabay.com/photo/2016/03/27/21/59/bread-1284438_1280.jpg"></img> */}
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
        <div className="items-container"> 
                <div className="current-item-title">Current Items</div>
                
                <div className="items-list">{itemsArr}</div>
            </div>
    )
}

export default MyItems;