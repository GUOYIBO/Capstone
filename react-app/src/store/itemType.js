const CREATE_ITEM_TYPE= '/itemType/add'
const DELETE_ITEM_TYPE= '/itemType/delete'
const UPDATE_ITEM_TYPE= '/itemType/update'
const GET_ITEM_TYPE= '/itemType/get'


const addItemType = (payload) =>{
    return {
        type: CREATE_ITEM_TYPE,
        payload
    }
    
}

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
            return newState
        case UPDATE_ITEM_TYPE:
            return newState
        case GET_ITEM_TYPE:
            return newState
        default:
            return state;
    }
}

export default itemTypeReducer;
