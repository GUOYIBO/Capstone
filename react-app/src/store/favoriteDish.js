const LOAD_ALL_FAVORITE_DISHES = 'favoriteList/loadAll'
const DELETE_A_DISH = 'favoriteList/deleteADish'
const UPDATE_A_DISH = 'favoriteList/updateADish'
const ADD_A_DISH = 'favoriteList/addADish'

const getAllFavoriteDishes =(payload) =>{
    return {
        type: LOAD_ALL_FAVORITE_DISHES,
        payload
    }
}
const deleteDish = (dishId) =>{
    return {
        type: DELETE_A_DISH,
        dishId
    }
}
const addDish = (payload) =>{
    return {
        type: ADD_A_DISH,
        payload
    }
}

const updateDish = (payload) =>{
    return {
        type: UPDATE_A_DISH,
        payload
    }
}

//Load all dishes 
export const getAllFavoriteDishesThunk = () => async (dispatch) =>{

    try {
        const response = await fetch('/api/favoritedishes/current')
        if (response.ok){
            const data = await response.json();
            console.log("get all data from thunk", data)
            dispatch(getAllFavoriteDishes(data.result));
        }

    }catch (err){
        console.log("Loading all favorite dishes error", err)
        throw err;
    }
}

/**
 * 
 * delet a dish  thunk 
 */
export const deleteADishThunk =(dishId) => async (dispatch) => {
    try{
        const response = await fetch(`/api/favoritedishes/${dishId}`, {
            method: "DELETE",
        })
        if (response.ok){
            dispatch(deleteDish(dishId))
        }
    }catch (err){
        console.log("error occured when deleting a dish ", err)
        throw err
    }

}


/**
 * 
 * create a dish thunk
 *  
 */
// img + item ids + name
export const addADishThunk = (dishData) => async (dispatch) => {
    try{
        const response = await fetch('/api/favoritedishes', {
            method : 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(dishData)
        })
        if (response.ok){
            const data = await response.json();
            dispatch(addDish(data.result))

        }
    }catch (err){
        console.log ("error occured when adding a dish", err);
        throw err
    }
}


/**
 * 
 * update a dish thunk
 */
export const updateADishThunk = (dishID, dishData) => async (dispatch) =>{
    try {
        const response = await fetch(`/api/favoritedishes/${dishID}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dishData)
        })
        if (response.ok){
            const data = await response.json()
            dispatch(updateDish(data.result));
        }

    }catch (err){
        console.log ("error occured when adding a dish", err);
        throw err
    }

}


const initialState = {}
const favoriteDishReducer = (state=initialState, action) =>{
    console.log("***************** Action favoriteDish reducer ***************", action)
    let newState = {...state};
    switch (action.type){
        case ADD_A_DISH:
            newState[action.payload.id] = action.payload
            return newState;
        case DELETE_A_DISH:
            delete newState[action.dishID]
            return newState;
        case UPDATE_A_DISH:
            newState[action.payload.id] = action.payload
            return newState;
        case LOAD_ALL_FAVORITE_DISHES:
            action.payload.forEach(element => {
                newState[element.id] = element
            });
            return newState;
        default :
            return state;
    }

}

export default favoriteDishReducer;
