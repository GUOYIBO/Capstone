import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deletePurchaseListThunk } from "../../store/purchaseList"
import EditPurchaseListModal from '../EditPurchaseListModal'
import { getAllPurchaseListsThunk} from '../../store/purchaseList'
import AddPurchaseListModal from '../AddPurchaseListModal'
import { FaTrashAlt } from "react-icons/fa";
import '../../components/MyCategory/MyCategory.css'
import '../EditCategoryFormMoal/EditCategoryForm.css'
import './MyPurchaseList.css'
const MyPurchaseList = () =>{

    const sessionUser = useSelector(state => state.session.user)
    const purchaseList = useSelector(state => state.purchaseListReducer)
    const dispatch = useDispatch();
    const history = useHistory()


    useEffect(()=>{
        
        (async()=> {
            await dispatch(getAllPurchaseListsThunk());
        })();

    },[dispatch])


    if (!sessionUser ){
        return <>Loading...</>;
    }
    if (!purchaseList){
        return <>Loading...</>;
    }
    const handleDelete = async (purchaseId) =>{
        if (window.confirm('Are you sure you want to delete this purchase list?')){
            await dispatch(deletePurchaseListThunk(+purchaseId)).then(() => history.push('/mypurchaselists'))
        }

    }

    console.log("purchase list--", purchaseList)

    return (
        <div className="items-container">
        <div className="current-item-title">My Purchase List</div>
        <div className="add-btn">
                <AddPurchaseListModal/>
            </div>
        {/* <div className="purchase-list-container"> */}
            <div className="my-items-list">
            { Object.values(purchaseList).length >0 && Object.values(purchaseList).map(purchase =>{
                return (
                <div className="item-detail" key={purchase.id}>
                     <div className="item-img-container">
                     {/* <div className="item-description"> */}
                        
                        <EditPurchaseListModal purchase={purchase} />

                    {/* </div> */}
                    <div className="delete-inline" id="mypurchasedelete">
                                        <div className="delete-white-icon"> 
                                          <FaTrashAlt onClick={()=>handleDelete(purchase.id)}/></div>
                                     </div>
                     </div>
                    {/* <div className="purchase-list-name">{purchase.name}</div> */}
                   
                   
                    {/* <button onClick={()=>handleDelete(purchase.id)}className="purchase-list-delete">Remove</button> */}
                </div>)
            })}
            {/* </div> */}
           
        </div>
        </div>
    )
}

export default MyPurchaseList