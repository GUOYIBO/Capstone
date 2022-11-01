import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { deletePurchaseListThunk } from "../../store/purchaseList"
import EditPurchaseListModal from '../EditPurchaseListModal'
import { getAllPurchaseListsThunk} from '../../store/purchaseList'
import AddPurchaseListModal from '../AddPurchaseListModal'

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
        if (window.confirm('Are you sure you want to delete this category?')){
            await dispatch(deletePurchaseListThunk(+purchaseId)).then(() => history.push('/mypurchaselists'))
        }

    }

    console.log("purchase list--", purchaseList)

    return (
        <div className="purchase-list-container">
            <h3>My Purchase List</h3>
            <div className="purchase-list-content">
            { Object.values(purchaseList).length >0 && Object.values(purchaseList).map(purchase =>{
                return (
                <div className="purchase-list-row" key={purchase.id}>
                    <div className="purchase-list-name">{purchase.name}</div>
                    <div className="pruchase-list-content">
                        <textarea value={purchase.content} disabled="true"/>
                    </div>
                    <EditPurchaseListModal purchase={purchase} />
                    <button onClick={()=>handleDelete(purchase.id)}className="purchase-list-delete">Remove</button>
                </div>)
            })}
            </div>
            <div className="add-purchase-list-button">
                <AddPurchaseListModal/>
            </div>
        </div>
    )
}

export default MyPurchaseList