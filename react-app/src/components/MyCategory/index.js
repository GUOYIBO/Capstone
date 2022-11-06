import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { deleteACategoryThunk, getAllCategoryThunk } from '../../store/category'
import AddCategoryFormModal from '../AddCategoryModal'
import EditCategoryFormModal from '../EditCategoryFormMoal'
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
        <div className="my-category-container">
            <div className="-categoty-title">Manage Categories</div>
            <div className="add-category-container">
                <AddCategoryFormModal />
            </div>
            <div className="categories-list-container">
               { !!Object.values(categories).length && Object.values(categories).map(category =>{
                    return (
                        
                            <div key={category.id} className="item-detail">
                                <div className="my-category-img">
                                     <EditCategoryFormModal category={category}/>
                                     <div className="delete-inline">
                                        <div className="delete-black-icon"> 
                                          <FaTrashAlt onClick={()=>handleDelete(category.id)}/></div>
                                     </div>
                                </div>
                                <div className="my-category-name">{category.name}</div>
                                
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