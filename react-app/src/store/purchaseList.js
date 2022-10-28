const ADD_PURCHASE_LIST = 'purchase/ADD_PURCHASE_LIST'
const DELETE_PURCHASE_LIST = 'purchase/DELETE_PURCHASE_LIST'
const UPDATE_PURCHASE_LIST = 'purchase/UPDATE_PURCHASE_LIST'
const GET_ALL_PURCHASE_LISTS = 'purchase/GET_ALL_PURCHASE_LISTS'




export const getAllPurchaseListsThunk = (pListData) => async () =>{
    try{
        const response = await fetch('/api/purchaselists')
        if (response.ok){
            //TODO dispatch
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
            //TODO dispatch
        }
    }catch (err){
        console.log("creating purchase list error", err);
        throw err;
    }

}


export const deletePurchaseListThunk = (pListId) => async (dispatch) =>{
    try{
        const response = await fetch(`/api/categories/${pListId}`, {
            method: 'DELETE'
        })
        if (response.ok){
            //TODO dispatch
        }

    }catch (err){
        console.log("deleting purchase list error", err)
        throw err
    }

}


export const updatePurchaseListThunk = (pListData, pListId) => async (dispatch) =>{
    try{
        const response = await fetch(`/api/categories/${pListId}`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(pListData)
        })
        if (response.ok){
            //TODO dispatch
        }
    }catch (err){
        console.log("updating purchase list error ", err);
        throw err
    }

}



const initialState = {};
const purchaseListReducer = (state=initialState, action) =>{
    let newState = {...state};
    switch (action.type){
        case ADD_PURCHASE_LIST:
            return newState;
        case DELETE_PURCHASE_LIST:
            return newState;
        case UPDATE_PURCHASE_LIST:
            return newState;
        case GET_ALL_PURCHASE_LISTS:
            return newState;
        default:
            return state;
    }

}

export default purchaseListReducer;