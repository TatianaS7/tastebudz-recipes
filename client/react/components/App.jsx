import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";
import apiURL from "../api"

// Import Components
import Navbar from "./Navbar";
import Landing from "./Landing";
import Search from "./Search";
import Home from "./Home";

function App() {
    const { isAuthenticated, user } = useAuth0();

    const [searchView, setSearchView] = useState(false);
    const [homeView, setHomeView] = useState(true);
    const [defaultView, setDefaultView] = useState(true);
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const [searchedGroups, setSearchedGroups] = useState([]);
    const [userData, setUserData] = useState([]);


    // Fetch User
    async function fetchUser(user) {
        try {
            if (isAuthenticated) {
                const res = await axios.post(`${apiURL}/users/`, {
                    email: user.email
                });
                console.log(res.data);
                const data = res.data;
                setUserData(data);
            }
        } catch (error) {
        console.error(error);
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            fetchUser(user);
        }
    }, [isAuthenticated]);

    // Search Recipes Function
    async function searchRecipes(query) {
        try {
            const res = await axios.get(`${apiURL}/search/recipes`, {
                params: {
                    query: query
                }
            });
            console.log(res.data);
            const data = res.data;
            setSearchedRecipes(data);
        } catch (error) {
            console.error(error);
        }
    }

    // Search Groups Function
    async function searchGroups(query) {
        try {
            const res = await axios.get(`${apiURL}/search/groups`, {
                params: {
                    query: query
                }
            });
            const data = res.data;
            setSearchedGroups(data);
        } catch (error) {
            console.error(error);
        }
    }

    // Join Group Function
    async function joinGroup(user, groupCode, group_id) {
        try {
            const res = await axios.put(`${apiURL}/groups/join/${group_id}`, {
                email: user.email,
                join_code: groupCode
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <main>
            <Navbar searchView={searchView} setSearchView={setSearchView} homeView={homeView} setHomeView={setHomeView} defaultView={defaultView} setDefaultView={setDefaultView}/>
            {!isAuthenticated ? 
                <Landing />
            : searchView ?
                <Search searchRecipes={searchRecipes} searchedRecipes={searchedRecipes} setSearchedRecipes={setSearchedRecipes} searchGroups={searchGroups} searchedGroups={searchedGroups} setSearchedGroups={setSearchedGroups} joinGroup={joinGroup}/>
            : isAuthenticated && homeView &&
                <Home userData={userData} defaultView={defaultView} setDefaultView={setDefaultView} setSearchView={setSearchView}/>
            }
        </main>
    )
}

export default App;