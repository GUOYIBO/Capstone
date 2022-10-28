const ADD_A_CATEGORY = 'category/ADD_A_CATEGORY'
const DELETE_A_CATEGORY = 'category/DELETE_A_CATEGORY'
const UPDATE_A_CATEGORY = 'category/UPDATE_A_CATEGORY'
const GET_ALL_CATEGORIES ='category/GET_ALL_CATEGORIES'


/**
 * 
 * 
 */
export const createACategoryThunk = (categoryData) => async (dispatch) =>{
    try{
        const response = await fetch('/api/categories', {
            method : 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(categoryData)
        })

        if (response.ok){
            //TODO dispatch
        }

    }catch (err){
        console.log("creating a category error", err);
        throw err;
    }

}

/**
 * 
 *  
 */
export const deleteACategoryThunk = (categoryId) => async (dispatch) =>{
    try{
        const response = await fetch(`/api/categories/${categoryId}`,{
            method: "DELETE"
        });
        if (response.ok){
            //TODO dispatch
        }

    }catch(err){
        console.log("deleting category error ", err);
        throw err;
    }
    
}

/**
 * 
 *  
 */
export const updateACategoryThunk = (categoryData, categoryId) => async (dispatch) =>{
    try{
        const response = await fetch(`/api/categories/${categoryId}`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(categoryData)
        })
        if (response.ok){
            //TODO dispatch
        }

    }catch (err){
        console.log("updating category error ", err);
        throw err;
    }
    
}

/**
 * 
 *  
 */
export const getAllCategoryThunk = () => async (dispatch) =>{
    try {
        const response = await fetch('/api/categories');
        if (response.ok){
            //TODO dispatch
        }
    }catch (err){
        console.log("getting all categories error ", err);
        throw err
    }
    
}

const initialState={}
const categoryReducer = (state=initialState, action) =>{
    let newState = {...state}
    switch(action.tpye){
        case ADD_A_CATEGORY:
            return newState;
        case DELETE_A_CATEGORY:
            return newState;
        case UPDATE_A_CATEGORY:
            return newState;
        case GET_ALL_CATEGORIES:
            return newState;
        default:
            return state;
    }

}

export default categoryReducer;