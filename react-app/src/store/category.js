import { bulkDeleteItems} from './item'
import { bulkDeleteItemTypes } from './itemType'

const ADD_A_CATEGORY = 'category/ADD_A_CATEGORY'
const DELETE_A_CATEGORY = 'category/DELETE_A_CATEGORY'
const UPDATE_A_CATEGORY = 'category/UPDATE_A_CATEGORY'
const GET_ALL_CATEGORIES ='category/GET_ALL_CATEGORIES'
const UPDATE_CATEGORY_AFTER_DELETING_ITEM_TYPE = 'category/UPDATE_CATEGORY_AFTER_DELETING_ITEM_TYPE'
const UPDATE_CATEGORY_AFTER_ADDING_ITEM_TYPE = 'category/UPDATE_CATEGORY_AFTER_ADDING_ITEM_TYPE'
const UPDATE_CATEGORY_AFTER_EDITING_ITEM_TYPE = 'category/UPDATE_CATEGORY_AFTER_EDITING_ITEM_TYPE'
const CLEAR = 'category/CLEAR_STORE'

export const clearAllCategories = () =>{
    return {
        type: CLEAR
    }
}

export const updateCategotyWhenDeletingItemType = (categoryId, itemTypeId) =>{
    return {
        type: UPDATE_CATEGORY_AFTER_DELETING_ITEM_TYPE,
        itemTypeId,
        categoryId
    }
}

export const updateCategotyWhenAddingItemType = (categoryId, itemTypeData) =>{
    return {
        type: UPDATE_CATEGORY_AFTER_ADDING_ITEM_TYPE,
        categoryId,
        itemTypeData
    }
}

export const updateCategoryAfterEditingItemType = (itemTypeData) =>{
    return {
        type: UPDATE_CATEGORY_AFTER_EDITING_ITEM_TYPE,
        itemTypeData
    }
}



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
export const createACategoryThunk = (formData) => async (dispatch) =>{
    console.log("get data from req ", formData)
    try{
        const response = await fetch('/api/categories/', {
            method : 'POST',
            body: formData
        })

        if (response.ok){
            const data = await response.json()
            dispatch(addCategory(data.result))
            return data.result;
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
export const deleteACategoryThunk = (categoryId, itemTypeIds) => async (dispatch) =>{
    try{
        const response = await fetch(`/api/categories/${categoryId}`,{
            method: "DELETE"
        });
        if (response.ok){
            //const data = await response.json();
            dispatch(deleteCategory(categoryId))
            if (itemTypeIds.length>0){
                dispatch(bulkDeleteItemTypes(itemTypeIds))
                dispatch(bulkDeleteItems(itemTypeIds))
            }
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
export const updateACategoryThunk = (formData, categoryId) => async (dispatch) =>{
    try{
        const response = await fetch(`/api/categories/${categoryId}`, {
            method: 'PUT',
            body: formData
        })
        if (response.ok){
            const data = await response.json();
            console.log("update category response data  ",data)
            dispatch(updateCategory(data.result))
            return data.result
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
        const response = await fetch('/api/categories/current');
        if (response.ok){
            const data = await response.json()
            console.log('data---', data)
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
    console.log("***************** Action category reducer ***************", action)
    switch(action.type){
        
        case ADD_A_CATEGORY:
            console.log(" new statte 1", newState,   action.payload)
            newState[action.payload.id] = action.payload
            console.log(" new statte 2", newState)
            return newState;

        case DELETE_A_CATEGORY:
            delete newState[action.categoryId]
            return newState;

        case UPDATE_A_CATEGORY:
            newState[action.payload.id] = action.payload
            return newState;

        case GET_ALL_CATEGORIES:
            console.log ('action.payload----', action.payload)
            action.payload.forEach(element => {
                newState[element.id] = element
            });
            console.log('=========', newState)
            return newState;
        case UPDATE_CATEGORY_AFTER_DELETING_ITEM_TYPE:
            let newItems = []
            let category = state[action.categoryId]
            console.log('updated category',  category)
            if (state[action.categoryId]){
                state[action.categoryId].items.forEach(item =>{
                    if (item.id !== action.itemTypeId){
                        newItems.push(item)
                    }
                })
            }

            let updatedCategory  = {... category, items: newItems}
            console.log("updated cateforty ", updatedCategory);
            let res = {...state}
            res[action.categoryId] = updatedCategory
            return res;

        case UPDATE_CATEGORY_AFTER_ADDING_ITEM_TYPE:
            let newItems1 = [];
            let result = {...state}
            if (state[action.categoryId]){
                newItems1 = [...state[action.categoryId].items, action.itemTypeData]
                let updatedCategory  = {... state[action.categoryId], items: newItems1}
                result[action.categoryId] = updatedCategory
            }
            return result
        case UPDATE_CATEGORY_AFTER_EDITING_ITEM_TYPE:
            // let newItems2 = [];
            // let newRes = {...state}
            // let categoryId = action.itemTypeData.category_id
            // if (state[categoryId]){
            //     newItems2 = [...state[categoryId].items, action.itemTypeData]
            //     let updatedCategory1  = {... state[categoryId], items: newItems2}
            //     newRes[categoryId] = updatedCategory1
            // }
            // return newRes

            let newItems2 = []
            let categoryId = action.itemTypeData.category_id
            let category2= state[categoryId]
            if (state[categoryId]){
                state[categoryId].items.forEach(item =>{
                    if (item.id !== action.itemTypeData.id){
                        newItems2.push(item)
                    }else{
                        newItems2.push(action.itemTypeData)
                    }
                })
            }

            let updatedCategory2  = {... category2, items: newItems2}
            console.log("updated cateforty ", updatedCategory2);
            let newRes = {...state}
            newRes[categoryId] = updatedCategory2
            return newRes;

        case CLEAR:
                return {}
        default:
            return state;
    }

}

export default categoryReducer;