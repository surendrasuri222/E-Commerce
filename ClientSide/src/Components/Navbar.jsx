import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Nav() {
    const navigate = useNavigate();
    let token = localStorage.getItem("token");

    const handleLogOut = () => {
        localStorage.clear()
        navigate("/")
    }

    return (
        <div className="navbarComp">
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/dashboard">Welcome Folks</NavLink>
                    <NavLink to="/sendmail"> <i className="fa-solid fa-truck-fast fa-2x"></i></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav m-auto">
                            <li className="nav-item1">
                                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                            </li>
                            <li className="nav-item2">
                                <NavLink className="nav-link" to="/products">Products</NavLink>
                            </li>
                            <li className="nav-item2">
                                <NavLink className="nav-link" to="/wishlist">Wishlist</NavLink>
                            </li>
                            <li className="nav-item2">
                                <NavLink className="nav-link" to="/userprofile"><i className="fa-sharp fa-regular fa-user"></i>My Profile</NavLink>
                            </li>
                        </ul>
                        <div className="icons">
                            <div>
                                <Link to="/search"><i className="fa-solid fa-magnifying-glass fa-2x"></i></Link>
                                {
                                    token ? <button className='logout' onClick={handleLogOut}>Logout</button> : <NavLink to="/"><button className='logout'>Login</button></NavLink>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Nav;
