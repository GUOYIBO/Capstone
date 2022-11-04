import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteACategoryThunk, getAllCategoryThunk } from '../../store/category'
import AddCategoryFormModal from '../AddCategoryModal'
import EditCategoryFormModal from '../EditCategoryFormMoal'
import './MyCategory.css'
import {urlDisplay, importAll} from "../../utils/helper"


const MyCategory = () =>{

    console.log("show my category")
    const sessionUser = useSelector(state => state.session.user)
    const categories = useSelector(state => state.categoryReducer)
    const dispatch = useDispatch();
    const history = useHistory()


    useEffect(()=>{
        
        (async()=> {
            await dispatch(getAllCategoryThunk());
        })();

    },[dispatch])


    if (!sessionUser ){
        return <>Loading...</>;
    }
    if (!categories){
        return <>Loading...</>;
    }



    const handleDelete = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')){
            await dispatch(deleteACategoryThunk(+categoryId)).then(()=>history.push('/mycategories'))
        }
      }

    return (
        <div className="my-category-container">
            <div className="add-category-container">
                <AddCategoryFormModal />
            </div>
            <div className="categories-list-container">
               { !!Object.values(categories).length && Object.values(categories).map(category =>{
                    return (
                        
                            <div key={category.id} className="my-category-container">
                                <div className="my-category-img">
                                    <img src={urlDisplay(category.image_url)} />
                                    {/* <img src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"/> */}
                                </div>
                                <div className="my-category-name">{category.name}</div>
                                
                                <div className="edit-delete-category-container">
                                    <EditCategoryFormModal category={category}/>
                                    <button className="delete-button" onClick={()=>handleDelete(category.id)}>Delete</button>
                                </div>
                            </div>
                        
                    )
               })}
            </div>
        </div>
    )

}

export default MyCategory;