import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Components
import LogoutButton from "./Logout";

import "../styles/navbar.css";

import { SearchOutline } from 'react-ionicons'

function Navbar() {
    const { isAuthenticated, user } = useAuth0();

    return (
        <nav>
            <button id="logo">Tastebudz</button>
            <div className="center-align">
                <SearchOutline color={'#00000'} height="25px" width="25px" />                </div>
            {isAuthenticated &&
                <div className="right-align">
                    <LogoutButton />
                </div>
            }
        </nav>
    )
}

export default Navbar;