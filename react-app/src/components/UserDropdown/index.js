import './UserDropDown.css'


const UserDropDown = () =>{

    return (
        <>
            <div className="drop-down-menu-container">
                <button id="my-category"className="user-button">My Categories</button>
                <button id="my-items" className="user-button" >My Items</button>
                <button id="my-favorite-dishes" className="user-button" >My Favorite Dishes</button>
                <button id="my-purchase-list" className="user-button">My Purchase List</button>
                <button className="log-out-button">Log Out</button>
            </div>
        </>
    )
}

export default UserDropDown