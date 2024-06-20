import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
const Header = () => {
    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL} />
            </div>
            <div className="nav-items">
                <ul>
                    <li><Link to = "/">Home </Link></li>
                    <li> About us </li>
                    <li> Contact  </li>
                    <li>Cart</li>
                </ul>
            </div>
        </div>
    )
}

export default Header;