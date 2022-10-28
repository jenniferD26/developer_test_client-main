import { Link } from "react-router-dom"

function Navigation(){
    return(
        <div id='fixed-nav'>
            <nav id='nav-container'>
                <Link to="/">Home</Link>
            </nav>
        </div>
    )
}

export default Navigation