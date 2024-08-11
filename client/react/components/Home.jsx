import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/home.css";

import axios from "axios";
import apiURL from "../api"

import RecipeCard from "./RecipeCard";



function Home() {
    const { user } = useAuth0();
    const [defaultView, setDefaultView] = useState(true);
    const [recipesView, setRecipesView] = useState(false);
    const [allRecipes, setAllRecipes] = useState([]);
    const [myRecipes, setMyRecipes] = useState([]);


    console.log(user);

    async function getAllRecipes() {
        try {
            const res = await axios.get(`${apiURL}/recipes/all`);
            console.log(res.data);
            const data = res.data;
            setAllRecipes(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (defaultView) {
            getAllRecipes();
        }
    }, [defaultView]);


    return (
        <section>
            <h4 id="welcome">Welcome Back, {user.given_name}!</h4>

            <div className="flex-container">
                <div className="action-buttons">
                    <button id="create-recipe">Create Recipe</button><hr/>
                    <button id="create-group">Create Group</button>
                    <button id="join-group">Join Group</button>
                    <hr/>
                    <button id="my-recipes">My Recipes</button>
                    <button id="my-groups">My Groups</button>
                </div>

                <div id="content">
                    <div className="page-view">
                        {defaultView && (
                            <h5>All Recipes</h5>
                        )}
                    </div>
                    <div className="feed">
                        {defaultView && (
                            <>
                                <RecipeCard allRecipes={allRecipes} defaultView={defaultView}/>                      
                            </>
                        )}
                    
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;