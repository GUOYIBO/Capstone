import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import './Profile.css'



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

  const logout = async () => {
    // e.preventDefault();
    // dispatch(sessionActions.logout());
    // history.push('/');
  };

  return (
    <div className="drop-down">
      {/* <div className="logo-container"> */}
      <button className="logobutton" onClick={openMenu}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20"><path d="M19.167 3.333H.833v2.5h18.334v-2.5zm0 5.834H.833v2.5h18.334v-2.5zM.833 15h18.334v2.5H.833V15z"></path>
       
       </svg>
        {/* <i className="fa-solid fa-bars" ></i>
        <div className="profile-icon">
            <i className="fa-regular fa-user-circle fa-lg" ></i>
        </div> */}

      </button>
      {/* </div> */}
      {showMenu && (
        <div className="div-dropdown-container">
        <div className="profile-dropdown">
          <div className="drop-down-item">
            <div >{user.username}</div>
          </div>
          <div className="drop-down-item">
          <div >{user.email}</div>
          </div>
          <div className="drop-down-link-item">
            <NavLink exact to="/mycategories" activeClassName='active'>My Categories</NavLink>
          </div>

          <div className="drop-down-link-item">
            <div><NavLink exact to="/myitems">My Items</NavLink></div>
          </div>
          <div className="drop-down-link-item">
            <div ><NavLink exact to="/myfavoritedishes">My Favirote Dishes</NavLink></div>
          </div>
          <div className="drop-down-link-item">
          <div >
            <button className="logout-button" onClick={logout}>Log Out</button>
          </div>
          </div>
        </div>
        {/* <NavLink to='/mycategories'>My Categories</NavLink> */}
        </div>
        
      )}
     
    </div>
  );
}

export default Profile;
