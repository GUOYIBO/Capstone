import { useSelector } from "react-redux"
import Profile from './Profile'
import './Header.css'
import { NavLink } from "react-router-dom"
import logo from "../../image/logo.png"
import { MdOutlineEditNote } from "react-icons/md"
import {FaEdit} from "react-icons/fa"
import { urlDisplay, onErrorLoadHandler } from "../../utils/helper"

const Header = () =>{
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <Profile user={sessionUser} />
    );
  } else {
    
    sessionLinks = (
       <div className="logout-navContainer">
        {/* <div className="logotitle-container"> */}
            {/* <div id="logotitle">
              <img onError={onErrorLoadHandler} src={urlDisplay("logotitle.png")}/>
            </div> */}
            <div id="logotitle">
          <div className="logotitle1">My</div>
          <div className="logotitle2">Pantry</div></div> 
        <div className="loginsingup-container">
             <NavLink className="top-right-container" to='/login'>
            <button >Log In</button>
             </NavLink>
             <NavLink className="top-right-container" to='/sign-up'>
            <button >Sign Up</button>
            </NavLink>
        </div>
    </div>
    );
  }

  return (
      <>
      { sessionLinks}</>
  );
}

export default Header
