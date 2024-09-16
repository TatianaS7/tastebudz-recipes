import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Import Components
import LogoutButton from "./Logout";
import LoginButton from "./Login";

import "../styles/navbar.css";
// import logo from "../../assets/logo.png";
import logo from "../../assets/tastebudz-logo.png";

import { SearchOutline } from 'react-ionicons'
import { HomeOutline } from 'react-ionicons'

function Navbar({ getAllRecipes, searchView, setSearchView, homeView, setHomeView, defaultView, setDefaultView, landingView, setLandingView, fetchUser }) {
    const { isAuthenticated, user } = useAuth0();

    // Handle Logo Click
    function handleLogoClick() {
        if (isAuthenticated) {
            fetchUser(user);
            setHomeView(true);
            setSearchView(false);
            setDefaultView(true);
            setLandingView(false);
        } else {
            setLandingView(true);
            setHomeView(false);
            setSearchView(false);
            setDefaultView(false);
        }
    }

    // Search Button Click Handler
    function handleSearchClick() {
        setSearchView(true);
        setHomeView(false);
        setDefaultView(false);
        setLandingView(false);
        console.log("Search View: ", true);
    }

    useEffect(() => {
        if (searchView) {
            getAllRecipes();
        }
    }, [searchView]);


    function handleHomeClick() {
        fetchUser(user);
        setHomeView(true);
        setSearchView(false);
        setDefaultView(true);
        console.log("Home View: ", true);
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchUser(user);
        }
    }, [isAuthenticated]);


    return (
        <nav>
            <div className="left-align">
                <button id="logo" onClick={() => handleLogoClick()}><img src={logo}></img></button>
                {isAuthenticated && 
                    <button id="home" onClick={handleHomeClick}><HomeOutline color={'#00000'} height="35px" width="35px"/></button>
                }
            </div>
                <div className="right-align">
                    <button id="searchBtn" onClick={handleSearchClick}><SearchOutline color={'#00000'} height="35px" width="35px" /></button>
                    {searchView && 
                        <div id="login-div">
                            <LoginButton />
                        </div>
                    }
                    {isAuthenticated &&
                        <LogoutButton />
                    }
                </div>
        </nav>
    )
}

export default Navbar;