import { useSelector } from "react-redux"
import Profile from './Profile'
import './Header.css'
import { NavLink } from "react-router-dom"
import logo from "../../image/logo.png"
import { MdOutlineEditNote } from "react-icons/md"
import {FaEdit} from "react-icons/fa"

const Header = () =>{
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <Profile user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink className="nav-button" to='/login'>
            <button >Log In</button>
        </NavLink>
        <NavLink className="nav-button" to='/sign-up'>
            <button >Sign Up</button>
        </NavLink>
      </>
    );
  }

  return (
    <div className="NavContainer">
      {/* <div className='logo-container'> */}
      { sessionLinks}
      {/* </div> */}
      <div className="top-right-container">
      <NavLink to='/mypurchaselists'>
      {/* <button><FaShoppingCart className="shopping-icon"></FaShoppingCart>Purchase List</button></NavLink> */}
      <button>
        {/* <MdOutlineEditNote className="shopping-icon">
        </MdOutlineEditNote> */}
        <FaEdit className="shopping-icon"></FaEdit>
        Purchase List
        </button>
      </NavLink>
      {/* <NavLink className="home-nav-link" exact to="/main"></NavLink> */}

      </div>

    </div>
  );
}

export default Header
