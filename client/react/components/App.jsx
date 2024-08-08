import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";
import apiURL from "../api"

// Import Components
import Navbar from "./Navbar";
import Landing from "./Landing";
import Search from "./Search";

function App() {
    const { isAuthenticated, user } = useAuth0();

    const [searchView, setSearchView] = useState(false);
    const [searchedRecipes, setSearchedRecipes] = useState([]);

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

    return (
        <main>
            <Navbar searchView={searchView} setSearchView={setSearchView}/>
            {!isAuthenticated ? 
                <Landing />
            : searchView && 
                <Search searchRecipes={searchRecipes} searchedRecipes={searchedRecipes} setSearchedRecipes={setSearchedRecipes}/>
            }
        </main>
    )
}

export default App;