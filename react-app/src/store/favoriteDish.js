const LOAD_ALL_FAVORITE_DISHES = 'favoriteList/loadAll'
const DELETE_A_DISH = 'favoriteList/deleteADish'
const UPDATE_A_DISH = 'favoriteList/updateADish'
const ADD_A_DISH = 'favoriteList/addADish'


//Load all categories 
export const getAllFavoriteDishesThunk = () => async (dispatch) =>{

    try {
        const response = await fetch('/api/favoritedishes')
        if (response.ok){
            //TODO dispatch
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
            //TODO
            const data = await response.json();

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
            // TODO

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
export const updateADishThunk = (dishData, dishID) => async (dispatch) =>{
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
        }
        
    }catch (err){
        console.log ("error occured when adding a dish", err);
        throw err
    }

}


const initialState = {}
const favoriteDishReducer = (state=initialState, action) =>{
    let newState = {...state};
    switch (action.tpye){
        case ADD_A_DISH:
            return newState;
        case DELETE_A_DISH:
            return newState;
        case UPDATE_A_DISH:
            return newState;
        case LOAD_ALL_FAVORITE_DISHES:
            return newState;
        default :
            return state;
    }

}

export default favoriteDishReducer;
