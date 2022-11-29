import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllCategoryThunk } from "../../store/category";
import { urlDisplay, onErrorLoadHandler } from '../../utils/helper';
import { FaTrashAlt } from "react-icons/fa";
import AddItemTypeModal from "../AddItemTypeModal"
import "./MyItemTypes.css"

const MyItemTypes = () =>{

    const sessionUser = useSelector(state => state.session.user)
    const categories = useSelector(state => state.categoryReducer)
    const dispatch = useDispatch();

    useEffect(()=>{
        (async()=> {
            await dispatch(getAllCategoryThunk());
        })();
    },[dispatch])

    if (!sessionUser ){
        return <>Loading...8</>;
    }
    if (!categories){
        return <>Loading...9</>;
    }

    console.log("category....", categories)

    return (
        <div className="items-types-container">
             <div className="current-item-title">Manage Item Types</div>
            <div className="add-btn">
                    <AddItemTypeModal />
             </div>
            <div className="my-category-list">
                { !!Object.values(categories).length && Object.values(categories).map(category =>{
                    return (
                        <div key={category.id} >
                            {/* <div className="item-img-container"> */}
                                <div className="about-category">
                                    <div className="form-subtitle">{category.name} </div>
                                    {/* <div className="category-img">
                                        <img onError={onErrorLoadHandler} src={urlDisplay(category.image_url)} className="category-title-image" ></img>
                                    </div> */}
                                </div>
                                
                                <div className="my-items-list">
                                    {
                                        category.items.map(item =>{
                                            return  ( 
                                                <div key={item.id} className="item-detail"> 
                                                 <div className="item-img-container">
                                                 <div id="item-type" className="item-img">
                                                 <img onError={onErrorLoadHandler} src={urlDisplay(item.image_url)}/>
                                                 </div>
                                                 <div className="delete-inline">
                                                     <div id="delete-black" className="delete-blue-icon"> 
                                                    <FaTrashAlt/>
                                                    </div>
                                                </div>
                                                    </div>
                                                    <div>
                                                    <div  className="fav-dish-name">{item.name}</div></div>
                                                    <div  className="category-item-type-image">
                                                           
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                   
                                </div>

                            {/* </div> */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyItemTypes