import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/home.css";

import axios from "axios";
import apiURL from "../api"

import RecipeCard from "./RecipeCard";
import JoinGroup from "./JoinGroup";
import GroupCard from "./GroupCard";



function Home({ userData, defaultView, setDefaultView, setSearchView }) {
    const { user } = useAuth0();
    const [myRecipesView, setMyRecipesView] = useState(false);
    const [allRecipes, setAllRecipes] = useState([]);

    const [myGroupsView, setMyGroupsView] = useState(false);
    
    const myRecipes = userData.created_recipes;
    // const mySaves = userData.saved_recipes;
    const myGroups = userData.groups;


    // Fetch All Public Recipes
    async function getAllRecipes() {
        try {
            const res = await axios.get(`${apiURL}/recipes/all`);
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

    // Toggle My Recipes View
    function toggleMyRecipes() {
        setDefaultView(false);
        setMyRecipesView(true);
        console.log(myRecipes);
    }


    // Toggle My Groups View
    function toggleMyGroups() {
        setMyGroupsView(true);
        setDefaultView(false);
        setMyRecipesView(false);
        console.log(myGroups);
    }

    return (
        <section>
            <h4 id="welcome">Welcome Back, {user.given_name}!</h4>

            <div className="flex-container">
                <div className="action-buttons">
                    <button id="public-recipes" onClick={() => setDefaultView(true)}>Home</button><hr/>
                    <button id="create-recipe">Create a Recipe</button>
                    <button id="create-group">Create a Group</button>
                    <hr/>
                    <button id="my-recipes" onClick={toggleMyRecipes}>My Recipes</button>
                    <button id="my-groups" onClick={toggleMyGroups}>My Groups</button>
                </div>

                <div id="content">
                    <div className="page-view">
                        {defaultView ? (
                            <h5>All Recipes</h5>
                        ) : myRecipesView ? (
                            <h5>My Recipes</h5>
                        ) : myGroupsView && (
                            <h5>My Groups</h5>
                        )}
                    </div>
                    <div className="feed">
                        {defaultView ? (
                            <>
                                <RecipeCard allRecipes={allRecipes} defaultView={defaultView}/>                      
                            </>
                        ) :
                        myRecipesView ? (
                            <>
                                {myRecipes && myRecipes.length === 0 && (
                                <div className="empty-message">
                                    <p>No recipes created yet!</p>
                                </div>
                                )}
                                <RecipeCard myRecipes={myRecipes} myRecipesView={myRecipesView}/>
                            </>
                        ) : myGroupsView && (
                            <>
                                {myGroups && myGroups.length === 0 && (
                                    <div className="empty-message">
                                        <p>No groups joined yet!</p>
                                    </div>
                                )}
                                <GroupCard myGroups={myGroups} myGroupsView={myGroupsView} />  
                            </>  
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;