import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Components
import LogoutButton from "./Logout";

import "../styles/navbar.css";
import logo from "../../assets/logo.png";

import { SearchOutline } from 'react-ionicons'
import { HomeOutline } from 'react-ionicons'

function Navbar({ searchView, setSearchView, homeView, setHomeView, defaultView, setDefaultView, landingView, setLandingView }) {
    const { isAuthenticated, user } = useAuth0();

    // Search Button Click Handler
    function handleSearchClick() {
        // setSearchView(!searchView);
        // setHomeView(!homeView);
        if (isAuthenticated) {
            setSearchView(!searchView);
            setHomeView(!homeView);
        } else {
            setLandingView(!landingView);
            setSearchView(true);
        }
    }

    function handleHomeClick() {
        setHomeView(true);
        setSearchView(false);
        setDefaultView(true);
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
                    <button id="searchBtn" onClick={handleSearchClick}><SearchOutline color={'#00000'} height="25px" width="25px" /></button>
                    {isAuthenticated &&
                        <LogoutButton />
                    }
                </div>
        </nav>
    )
}

export default Navbar;