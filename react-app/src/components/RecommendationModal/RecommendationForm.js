import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getAllFavoriteDishesThunk } from "../../store/favoriteDish"
import { getAllItemsThunk } from "../../store/item"
import { urlDisplay , onErrorLoadHandler} from "../../utils/helper"
import './RecommendationForm.css'

const RecommendationForm = ({setShowModal}) =>{
    const dispatch = useDispatch()
    
    const items = useSelector(state => state.itemReducer)
    const favoritedishes = useSelector(state => state.favoriteDishReducer);

    useEffect(()=>{
        (async()=> {
            await dispatch(getAllFavoriteDishesThunk());
            await dispatch(getAllItemsThunk());
        })();

    },[dispatch])

    if (!items || !favoritedishes){
        return  <> Loading... 10 </>
    }

    let recommendations = []
    let userItemIdSet = new Set()
    for (let user_item of Object.values(items)){
        userItemIdSet.add(user_item.item_id)
    }

    for (let dish of Object.values(favoritedishes)){
        let existingFlag = true;
        for (let j=0; j< dish.items.length; j++){
            if (!userItemIdSet.has(dish.items[j].id)){
                existingFlag = false
                break;
            }
        }
        if (existingFlag){
            recommendations.push(dish)
        }
    }
    console.log ("result array ",recommendations)
    const res = recommendations.map(rec=>{
        return (
            <div key={rec.id} className="today-reco-dish">
                <div className="form-subtitle">{rec.name}</div>
                <div className="dish-img">
                    <img onError={onErrorLoadHandler} src={urlDisplay(rec.image_url)}></img>
                </div>
            </div>
        )
    })
    return (
        <div id='form-container' className='form-container'>  
        <div className='close-button-container'>
                <button aria-label='Close' id="closeButton" className="closebutton"  onClick={()=>setShowModal(false)}>
                   <div className="close-icon">
                    <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z" fill="#000000"></path></svg></div>
                </button>
            </div>
            <div id="reco-form" className="form-content-container">
               <div className='form-title'>Today's Recommendation</div>
               <div className="today-reco-container">
                   {res}
                  </div>
             </div>
             </div>
    )
}
export default RecommendationForm