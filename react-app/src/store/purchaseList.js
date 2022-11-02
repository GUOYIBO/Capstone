const ADD_PURCHASE_LIST = 'purchase/ADD_PURCHASE_LIST'
const DELETE_PURCHASE_LIST = 'purchase/DELETE_PURCHASE_LIST'
const UPDATE_PURCHASE_LIST = 'purchase/UPDATE_PURCHASE_LIST'
const GET_ALL_PURCHASE_LISTS = 'purchase/GET_ALL_PURCHASE_LISTS'


const loadAllPurchaseList = (payload) => {
    return {
        type: GET_ALL_PURCHASE_LISTS,
        payload
    }
}

const addPurchaseList = (payload) =>{
    return {
        type: ADD_PURCHASE_LIST,
        payload
    }
}

const deletePurchaseList = (purchaseListId) =>{
    return {
        type: DELETE_PURCHASE_LIST,
        purchaseListId
    }
}

const updatePurchaseList = ( payload ) =>{
    return {
        type: UPDATE_PURCHASE_LIST,
        payload
    }
}

export const getAllPurchaseListsThunk = () => async (dispatch) =>{
    try{
        const response = await fetch('/api/purchaselists/current')
        if (response.ok){
            const data = await response.json();
            
            dispatch(loadAllPurchaseList(data.result))
        }
    }catch (err){
        console.log("getting all purchase lists error", err)
        throw err;
    }

}

export const createPurchaseListThunk = (pListData) => async (dispatch) =>{
    try{
        const response = await fetch('/api/purchaselists', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(pListData)
        })
        if (response.ok){
            const data = await response.json()
            dispatch(addPurchaseList(data.result))
        }
    }catch (err){
        console.log("creating purchase list error", err);
        throw err;
    }

}


export const deletePurchaseListThunk = (pListId) => async (dispatch) =>{
    console.log('delete plist id', pListId )
    try{
        const response = await fetch(`/api/purchaselists/${pListId}`, {
            method: 'DELETE'
        })
        if (response.ok){
            const data = await response.json()
            console.log("get response data ",data)
            dispatch(deletePurchaseList(pListId))
        }

    }catch (err){
        console.log("deleting purchase list error", err)
        throw err
    }

}


export const updatePurchaseListThunk = (pListData, pListId) => async (dispatch) =>{
    try{
        const response = await fetch(`/api/purchaselists/${pListId}`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(pListData)
        })
        if (response.ok){
            const data = await response.json()
            dispatch(updatePurchaseList(data.result))
        }
    }catch (err){
        console.log("updating purchase list error ", err);
        throw err
    }

}



const initialState = {};
const purchaseListReducer = (state=initialState, action) =>{
    console.log("******************** Action purchaseListReducer ******************", action)
    let newState = {...state};
    switch (action.type){
        case ADD_PURCHASE_LIST:
            newState[action.payload.id] = action.payload
            return newState;
        case DELETE_PURCHASE_LIST:
            delete newState[action.purchaseListId]
            return newState;
        case UPDATE_PURCHASE_LIST:
            newState[action.payload.id] = action.payload
            return newState;
        case GET_ALL_PURCHASE_LISTS:
            action.payload.forEach(element => {
                newState[element.id] = element
            });
            return newState;
        default:
            return state;
    }

}

export default purchaseListReducer;