import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteACategoryThunk, getAllCategoryThunk } from '../../store/category'
import AddCategoryFormModal from '../AddCategoryModal'
import EditCategoryFormModal from '../EditCategoryFormMoal'



const MyCategory = () =>{

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
            <div className="category-img-container">
               { !!Object.values(categories).length && Object.values(categories).map(category =>{
                    return (
                        <>
                            <div key={category.id}>
                                <div className="category-name">{category.name}</div>
                                <div className="category-img-div">
                                    <img src={category.image_url} />
                                </div>
                                <div className="edit-delete-category-container">
                                    <EditCategoryFormModal category={category}/>
                                    <button onClick={()=>handleDelete(category.id)}>Delete</button>
                                </div>
                            </div>
                        </>
                    )
               })}
            </div>
        </div>
    )

}

export default MyCategory;