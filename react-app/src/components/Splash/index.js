import "./Splash.css"
import spalsh1 from '../../image/splash1.jpg';
import spalsh2 from '../../image/splash2.jpg';
const Splash = () =>{
    return (
        // <div className="splash-main-container" style={{
        //     backgroundImage: `url(${spalsh1})`, backgroundSize: 'auto' 
        //   }}>
       
        <div className="splash-main-container">
             {/* <div className="slideshow-container"> */}
                <div className="splash-background fade">
                 <img src={spalsh1} />
                </div>
                <div className="splash-background fade">
                 <img src={spalsh2} />
                </div>
            {/* </div> */}
            <div className="splash-welcome">
            Welcome to My Pantry !
            </div>
           
        </div>
    )
}

export default Splash