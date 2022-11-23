import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteACategoryThunk, getAllCategoryThunk } from '../../store/category'
import AddCategoryFormModal from '../AddCategoryModal'
import EditCategoryFormModal from '../EditCategoryFormMoal'
import AddItemTypeModal from '../AddItemTypeModal'
import './MyCategory.css'
import {urlDisplay, importAll} from "../../utils/helper"
import { Modal } from '../../context/Modal';
import EditCategoryForm from '../EditCategoryFormMoal/EditCategoryForm';
import '../EditCategoryFormMoal/EditCategoryForm.css'
import React, { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
const MyCategory = () =>{

    const sessionUser = useSelector(state => state.session.user)
    const categories = useSelector(state => state.categoryReducer)
    const dispatch = useDispatch();
    const history = useHistory()
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        
        (async()=> {
            await dispatch(getAllCategoryThunk());
        })();

    },[dispatch])


    if (!sessionUser ){
        return <>Loading...4</>;
    }
    if (!categories){
        return <>Loading..5.</>;
    }

   

    const handleDelete = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')){
            await dispatch(deleteACategoryThunk(+categoryId)).then(()=>history.push('/mycategories'))
        }
      }

    return (
        <div className="items-container">
            <div className="current-item-title">Manage Categories</div>
            <div className="add-btn">
                <AddCategoryFormModal />
            </div>
            <div className="add-btn">
                <AddItemTypeModal />
            </div>
            <div className="my-items-list">
               { !!Object.values(categories).length && Object.values(categories).map(category =>{
                    return (
                        
                            <div key={category.id} className="item-detail">
                                <div className="item-img-container">
                                   <div id="category-item" className="item-img">
                                     <EditCategoryFormModal category={category}/>
                                     <div className="delete-inline">
                                        <div className="delete-white-icon"> 
                                          <FaTrashAlt onClick={()=>handleDelete(category.id)}/></div>
                                     </div>
                                </div>
                                    </div>
                                    <div className='fav-dish-name'>{category.name}</div>
                                <div className="edit-delete-category-container">
                                    {/* <EditCategoryFormModal category={category}/> */}
                                    {/* <button className="delete-button" onClick={()=>handleDelete(category.id)}>Delete</button> */}
                                </div>
                            </div>
                        
                    )
               })}
            </div>
        </div>
    )

}

export default MyCategory;