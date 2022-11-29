import { deleteAllItemsByType} from './item'

const CREATE_ITEM_TYPE= '/itemType/add'
const DELETE_ITEM_TYPE= '/itemType/delete'
const UPDATE_ITEM_TYPE= '/itemType/update'
const GET_ITEM_TYPE =   '/itemType/get'
const DETETE_ITEM_TYPES_BY_CATEGORY = '/itemType/delete_by_category'
const CLEAR = '/itemType/clear'


const addItemType = (payload) =>{
    return {
        type: CREATE_ITEM_TYPE,
        payload
    }
}

const deleteItemType = (itemTypeId) =>{
    return {
        type:DELETE_ITEM_TYPE,
        itemTypeId 
    }
}


export const clearAllItemTypes = () =>{
    return {
        type: CLEAR
    }
}

export const deleteAllItemTypesByCategory = (itemTypeIds) =>{
    return {
        type: DETETE_ITEM_TYPES_BY_CATEGORY,
        itemTypeIds
    }
}


//create item type thunk
export const createItemTypeThunk = (categoryId,  formData) => async (dispatch) =>{
    console.log("file request", formData)
    const response = await fetch(`/api/categories/${categoryId}/itemtypes`,{
        method: 'POST',
        body: formData
    })
    if (response.ok){
        const data = await response.json();
        dispatch(addItemType(data.result))
    }
}

// delete item type thunk
export const deleteItemTypeThunk = (itemTypeId) => async (dispatch) =>{
    console.log("delete item type request", itemTypeId)
    const response = await fetch(`/api/itemtypes/${itemTypeId}`,{
        method: 'DELETE'
    })
    if (response.ok){
        dispatch(deleteItemType(itemTypeId))
        dispatch(deleteAllItemsByType(itemTypeId))
    }
}




const initialState = {};

const itemTypeReducer = (state=initialState, action) =>{
    let newState = {...state};
    switch (action.type){
        case CREATE_ITEM_TYPE:
            if (!newState[action.payload.id]){
                newState[action.payload.id] = action.payload
            }
            return newState
        case DELETE_ITEM_TYPE:
            if (newState[action.itemTypeId] ){
                delete newState[action.itemTypeId] 
            }
            return newState
        case UPDATE_ITEM_TYPE:
            return newState
        case GET_ITEM_TYPE:
            return newState
        case DETETE_ITEM_TYPES_BY_CATEGORY :
            action.itemTypeIds.forEach(ele => {
                if (newState[ele]){
                    delete newState[ele]
                }
            });
            return newState
        case CLEAR:
            return {};
        default:
            return state;
    }
}

export default itemTypeReducer;
