import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import EditFavDishModal from '../EditFavDishModal'
import {getAllFavoriteDishesThunk, deleteADishThunk} from '../../store/favoriteDish'
import { useHistory } from 'react-router-dom';

const MyFavoriteDish = () =>{

    const favoritedishes = useSelector(state => state.favoriteDishReducer);
    
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory()

    useEffect(() =>{
        (async()=> {
            await dispatch(getAllFavoriteDishesThunk());
        })();

    }, [dispatch])


    if (!sessionUser || !favoritedishes){
        return <>Loading...</>;
    }

    const handleDelete = async (favDishId) => {
        if (window.confirm('Are you sure you want to delete this dish?')){
            await dispatch(deleteADishThunk(+favDishId)).then(()=>history.push('/myfavoritedishes'))
        }
      }

    return (
        <div className="my-fav-dish-container">
            <div className='my-fave-dish-add-btn'>
                <button className="add-fav-dish-btn">Add</button>
            </div>
            {/* <div className="my-fav-dish-slide-show">

            </div> */}
             { !!Object.values(favoritedishes).length && Object.values(favoritedishes).map(dish =>{
                    return (
                        <>
                            <div key={dish.id}>
                                <div className="fav-dish-name">{dish.name}</div>
                                <div className="fav-dish-img-div">
                                    <img src={dish.image_url} />
                                </div>
                                <div className="edit-delete-category-container">
                                    <EditFavDishModal dish={dish}/>
                                    <button className="my-fav-dish-remove-btn" onClick={()=>handleDelete(dish.id)}>Remove</button>
                                </div>
                            </div>
                        </>
                    )
               })}




            {/* <div className="my-fav-dish-single-card">
                <div className="my-fav-dish-basic-info">

                </div>
                <div>
                    <EditFavDishModal />
                </div>
                <button className="my-fav-dish-remove-btn">Remove </button>
         
            </div> */}
        </div>
    )
}

export default MyFavoriteDish