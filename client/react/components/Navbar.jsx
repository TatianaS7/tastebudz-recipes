import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Components
import LogoutButton from "./Logout";

import "../styles/navbar.css";
import logo from "../../assets/logo.png";

import { SearchOutline } from 'react-ionicons'

function Navbar() {
    const { isAuthenticated, user } = useAuth0();

    return (
        <nav>
            <button id="logo"><img src={logo}></img></button>
                <div className="right-align">
                {isAuthenticated ?
                    <>
                        <SearchOutline color={'#00000'} height="25px" width="25px" />                
                        <LogoutButton />
                    </>
                :
                    <SearchOutline color={'#00000'} height="25px" width="25px" />                
                }
                </div>

        </nav>
    )
}

export default Navbar;