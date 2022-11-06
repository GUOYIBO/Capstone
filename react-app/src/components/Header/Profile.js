import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import { urlDisplay } from "../../utils/helper";
import './Profile.css'
import {FaHeart, FaHamburger, FaFolderOpen} from "react-icons/fa"
import { logout } from '../../store/session';



function Profile({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    console.log("click openMenu")
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      console.log("close menu")
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handlelogout = async () => {
    await dispatch(logout()).then(() => history.push('/'))
    //clear store
    
    
  };

  return (
    <div className="drop-down">
      {/* <div className="logo-container"> */}
      <button className="logobutton" onClick={openMenu}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20"><path d="M19.167 3.333H.833v2.5h18.334v-2.5zm0 5.834H.833v2.5h18.334v-2.5zM.833 15h18.334v2.5H.833V15z"></path>
       </svg>
        
      </button>
      <div className="logotitle-container">
        <NavLink to={"/main"}>
              <img src={urlDisplay("logotitle.png")}/></NavLink>
        </div>
      {/* </div> */}
      {showMenu && (
        <div className="div-dropdown-container">
        {/* <div className="profile-dropdown"> */}
        <div className="user-sec">
          <div className="user-name">
            <div >{user.username}</div>
          </div>
          <div className="user-email">
          <div >{user.email}</div>
          </div>
          </div>
          <div className="drop-down-link-item">
           
            <NavLink exact to="/mycategories" activeClassName='active'>
              <button className="nav-button">
              <FaFolderOpen className="fa-icon-link"></FaFolderOpen>
                My Categories
              </button></NavLink>
          </div>

          <div className="drop-down-link-item">
            <NavLink exact to="/myitems"><button className="nav-button">
            <FaHamburger className="fa-icon-link"></FaHamburger>
            My Items</button></NavLink>
          </div>
          <div className="drop-down-link-item">
            <NavLink exact to="/myfavoritedishes"><button className="nav-button">
             <FaHeart className="fa-icon-link"></FaHeart>
            My Favirote Dishes</button></NavLink>
          </div>
          <div className="logout-button">
            <button  onClick={handlelogout}>Log Out</button>
          </div>
        {/* </div> */}
        {/* <NavLink to='/mycategories'>My Categories</NavLink> */}
        </div>
        
      )}
     
    </div>
  );
}

export default Profile;
