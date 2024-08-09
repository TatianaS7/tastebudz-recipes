import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Components
import LogoutButton from "./Logout";

import "../styles/navbar.css";
import logo from "../../assets/logo.png";

import { SearchOutline } from 'react-ionicons'
import { HomeOutline } from 'react-ionicons'

function Navbar({ searchView, setSearchView, homeView, setHomeView }) {
    const { isAuthenticated, user } = useAuth0();

    // Search Button Click Handler
    function handleSearchClick() {
        setSearchView(!searchView);
        setHomeView(!homeView);
    }

    function handleHomeClick() {
        setHomeView(true);
        setSearchView(false);
    }

    return (
        <nav>
            <div className="left-align">
                <button id="logo"><img src={logo}></img></button>
                {isAuthenticated && 
                    <button id="home" onClick={handleHomeClick}><HomeOutline color={'#00000'} height="25px" width="25px"/></button>
                }
            </div>
                <div className="right-align">
                {isAuthenticated ?
                    <>
                        <button id="searchBtn" onClick={handleSearchClick}><SearchOutline color={'#00000'} height="25px" width="25px" /></button>
                        <LogoutButton />
                    </>
                :
                <button id="searchBtn" onClick={handleSearchClick}><SearchOutline color={'#00000'} height="25px" width="25px" /></button>
            }
                </div>

        </nav>
    )
}

export default Navbar;