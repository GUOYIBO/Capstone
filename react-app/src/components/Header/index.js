import { useSelector } from "react-redux"
import Profile from './Profile'
import './Header.css'
import { NavLink } from "react-router-dom"
import logo from "../../image/logo.png"

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
        <NavLink className="nav-button" to='/signup'>
            <button  >Sign Up</button>
        </NavLink>
      </>
    );
  }

  return (
    <div className="NavContainer">
      {/* <div className='logo-container'> */}
      { sessionLinks}
      {/* </div> */}
      <div className="login-signup-container">
      <button>Purchase List</button>
      {/* <NavLink className="home-nav-link" exact to="/main"></NavLink> */}

      </div>
      
      

    </div>
  );
}

export default Header
