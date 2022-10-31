const GET_ALL_ITEMS = '/items/getAll'
const DELETE_ITEM = 'items/deleteItem'
const UPDATE_ITEM = 'items/updateItem'
const ADD_ITEM = 'items/addItem'



const loadAllItems = (payload) =>{
    return {
        type: GET_ALL_ITEMS,
        payload
    }
}



const addItem = (payload) =>{
    return {
        type: ADD_ITEM,
        payload
    }
}

const updateItem = (payload) =>{
    return {
        type: UPDATE_ITEM,
        payload
    }
}

const deleteItem = (itemId) =>{
    return {
        type: DELETE_ITEM,
        itemId
    }
}
export const getAllItemsThunk = () => async (dispatch) =>{
    console.log("begin fetching all items....")
    try {
        const response = await fetch('/api/items/current')
        if (response.ok){
            //TODO dispatch
            const data = await response.json();
            console.log('item data -------', data);
            dispatch(loadAllItems(data.result))
        }
    }catch (err){
        console.log("Loading all favorite dishes error", err)
        throw err;
    }
}


export const addItemThunk = (itemData) => async (dispatch) =>{
    try{
        const response = await fetch('');
        if (response.ok){
            const data = await response.json();
            dispatch(addItem(data.result))
        }
    }catch (err){
        console.log ("adding item error ", err)
        throw err;
    }

}

export const deleteItemThunk = (itemId) => async (dispatch) =>{
    try{
        const response = await fetch('');
        if (response.ok){
            const data = response.json();
            dispatch(deleteItem(itemId))   
        }
    }catch (err){
        console.log ("deleting item error ", err)
        throw err;
    }
    
}

export const updateItemThunk = (itemId, itemData) => async (dispatch) =>{
    try{
        const response = await fetch('');
        if (response.ok){
            const data = await response.json();
            dispatch(updateItem(data.result))
        }
    }catch (err){
        console.log ("updating item error ", err)
        throw err;
    }
    
}



const initialState = {};
const itemReducer = (state=initialState, action) =>{
    let newState = {...state};
    switch(action.type){
        case GET_ALL_ITEMS:
            action.payload.forEach(element => {
                newState[element.id] = element;
            });
            return newState
        case DELETE_ITEM:
            delete newState[action.itemId]
            return newState
        case ADD_ITEM:
            newState[action.payload.id] = action.payload
            return newState
        case UPDATE_ITEM:
            newState[action.payload.id] = action.payload
            return newState
        default: 
            return state
    }
}

export default itemReducer;