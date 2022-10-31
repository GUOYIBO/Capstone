import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import img from '../../image/profileimage.png'


const Main = () => {

    const sessionUser = useSelector(state => state.session.user)
    const items = useSelector(state => state.itemReducer)
    const categories = useSelector(state => state.categoryReducer)
    const favoriteDishes = useSelector(state => state.categoryReducer);
    const purchaseList = useSelector(state => state.purchaseList)
    const [isLoaded, setLoaded] = useState(false)

    console.log("category ####", categories)
    useEffect(()=>{

    },[])
    

    if (!sessionUser){
        return <div>Loading...</div>;
    }
   

    const categoryArr = Object.values(categories).map((cat, index) =>{
        return (
        <div key={index}>
            <div  >{cat.name}</div>
            <div>
                <img src={img}></img>
            </div>
        </div>
            
        )
    })
    const itemsArr = Object.values(items).map((item) =>{
        return (
            <div key={item.id}>
                <div> {item.name} </div>
                <div> {item.image_url}</div>
            </div>
        )
    })
    return (
        <div>
            <div>Categories
                <div>{categoryArr}</div>
            </div>
            <div> Current Items
                <div>{itemsArr}</div>
            </div>
            
            <div className="filter">
                <div className="check-boxes">
                    <div>
                        <input type="checkbox" />3
                    </div>
                    <div>
                        <input type="checkbox" />5
                    </div>
                    <div>
                        <input type="checkbox" />7
                    </div>

                </div>
                <div>
                <input type="date" id="purchase" name="purchase-date"
       value="2022-10-31"
       min="2021-01-01" max="2022-12-31"/>

                </div>
            </div>
        </div>
    )

}

export default Main