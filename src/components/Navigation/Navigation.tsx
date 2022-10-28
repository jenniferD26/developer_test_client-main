import { Link } from "react-router-dom"
import './Navigation.css'

function Navigation(){
    return(
        <div id='fixed-nav'>
            <nav id='nav-container'>
                <Link to="/">Test</Link>
            </nav>
        </div>
    )
}

export default Navigation