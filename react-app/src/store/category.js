const ADD_A_CATEGORY = 'category/ADD_A_CATEGORY'
const DELETE_A_CATEGORY = 'category/DELETE_A_CATEGORY'
const UPDATE_A_CATEGORY = 'category/UPDATE_A_CATEGORY'
const GET_ALL_CATEGORIES ='category/GET_ALL_CATEGORIES'


const addCategory = (payload) => {
    return {
        type: ADD_A_CATEGORY,
        payload
    }
}


const deleteCategory = (categoryId) => {
    return {
        type: DELETE_A_CATEGORY,
        categoryId
    }
}


const updateCategory = (payload) => {
    return {
        type: UPDATE_A_CATEGORY,
        payload
    }
}

const getAllCategories = (payload) =>{
    return {
        type: GET_ALL_CATEGORIES,
        payload
    }
}

/**
 * 
 * create a category
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
            const data = await response.json()
            dispatch(addCategory(data.result))
        }

    }catch (err){
        console.log("creating a category error", err);
        throw err;
    }

}

/**
 * 
 * delete a category
 *  
 */
export const deleteACategoryThunk = (categoryId) => async (dispatch) =>{
    try{
        const response = await fetch(`/api/categories/${categoryId}`,{
            method: "DELETE"
        });
        if (response.ok){
            const data = await response.json();
            dispatch(deleteCategory(categoryId))
        }

    }catch(err){
        console.log("deleting category error ", err);
        throw err;
    }
    
}

/**
 * 
 * update a category
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
            const data = await response.json();
            dispatch(updateCategory(data.result))
        }

    }catch (err){
        console.log("updating category error ", err);
        throw err;
    }
    
}

/**
 * 
 *  get all categories
 * 
 */
export const getAllCategoryThunk = () => async (dispatch) =>{
    try {
        const response = await fetch('/api/categories');
        if (response.ok){
            const data = await response.json()
            dispatch(getAllCategories(data.result))
        }
    }catch (err){
        console.log("getting all categories error ", err);
        throw err
    }
    
}

const initialState={}
// category reducer
const categoryReducer = (state=initialState, action) =>{
    let newState = {...state}
    switch(action.tpye){
        case ADD_A_CATEGORY:
            newState[action.payload.id] = action.payload
            return newState;
        case DELETE_A_CATEGORY:
            delete newState[action.categoryId]
            return newState;
        case UPDATE_A_CATEGORY:
            newState[action.payload.id] = action.payload
            return newState;
        case GET_ALL_CATEGORIES:
            action.payload.forEach(element => {
                newState[element.id] = element
            });
            return newState;
        default:
            return state;
    }

}

export default categoryReducer;