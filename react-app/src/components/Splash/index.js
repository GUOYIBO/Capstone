import "./Splash.css"
import spalsh1 from '../../image/splash1.jpg';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { onErrorLoadHandler } from "../../utils/helper";


const Splash = () =>{
    return (  
        <div className="splash-main-container">
            <div className="splash-welcome">
                     Welcome to My Pantry !
            </div>
            
            <div className="splash-background">
                <img onError={onErrorLoadHandler} src={spalsh1} />
            </div>
           
            <div className='splash-footer'>
                <div className='footer-left'>
                    {"By Yibo Guo"}
                </div>
                    
                    <a href='https://github.com/GUOYIBO/'>
                        <div className="git-icon">
                            <FaGithub />
                        </div>
                    </a>
                    <a href='https://linkedin.com/in/yibo-g-502684191'>
                        <div className='git-icon'>
                            <FaLinkedin/>
                        </div>
                    </a>
            </div>
        </div>
    )
}

export default Splash