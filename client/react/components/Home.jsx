import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/home.css";

import axios from "axios";
import apiURL from "../api"

import RecipeCard from "./RecipeCard";
import GroupCard from "./GroupCard";
import CreateGroup from "./CreateGroup";



function Home({ userData, defaultView, setDefaultView, fetchUser }) {
    const { user } = useAuth0();
    const [myRecipesView, setMyRecipesView] = useState(false);
    const [allRecipes, setAllRecipes] = useState([]);

    const [myGroupsView, setMyGroupsView] = useState(false);
    const [mySavesView, setMySavesView] = useState(false);
    const [createGroupView, setCreateGroupView] = useState(false);
    
    const myRecipes = userData.created_recipes;
    const myGroups = userData.groups;
    const mySaves = userData.saved_recipes;


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
        setCreateGroupView(false);
        console.log(myRecipes);
    }


    // Toggle My Groups View
    function toggleMyGroups() {
        setMyGroupsView(true);
        setDefaultView(false);
        setMyRecipesView(false);
        setCreateGroupView(false);
    }

    // Toggle My Saves View
    function toggleMySaves() {
        setMySavesView(true);
        setDefaultView(false);
        setMyRecipesView(false);
        setMyGroupsView(false);
        setCreateGroupView(false);
    }

    // Toggle Create Group View
    function toggleCreateGroup() {
        setCreateGroupView(true);
        setDefaultView(false);
        setMyRecipesView(false);
        setMyGroupsView(false);
        setMySavesView(false);
    }

    return (
        <section>
            <h4 id="welcome">Welcome Back, {user.given_name}!</h4>

            <div className="flex-container">
                <div className="action-buttons">
                    <button id="public-recipes" onClick={() => setDefaultView(true)}>Home</button><hr/>
                    <button id="create-recipe">Create a Recipe</button>
                    <button id="create-group" onClick={toggleCreateGroup}>Create a Group</button>
                    <hr/>
                    <button id="my-recipes" onClick={toggleMyRecipes}>My Recipes</button>
                    <button id="my-groups" onClick={toggleMyGroups}>My Groups</button>
                    <button id="my-saved" onClick={toggleMySaves}>My Saves</button>
                </div>

                <div id="content">
                    <div className="page-view">
                        {defaultView ? (
                            <h5>All Recipes</h5>
                        ) : createGroupView ? (
                            <h5>Create a Group</h5>
                        ) : myRecipesView ? (
                            <h5>My Recipes</h5>
                        ) : myGroupsView ? (
                            <h5>My Groups</h5>
                        ) : mySavesView && (
                            <h5>My Saves</h5>
                        )}
                    </div>
                    <div className="feed">
                        {defaultView ? (
                            <>
                                <RecipeCard allRecipes={allRecipes} defaultView={defaultView}/>                      
                            </>
                        ) : createGroupView ? (
                            <>
                                <CreateGroup userData={userData} fetchUser={fetchUser} toggleMyGroups={toggleMyGroups}/>
                            </>
                        ) : myRecipesView ? (
                            <>
                                {myRecipes && myRecipes.length === 0 && (
                                <div className="empty-message">
                                    <p>No recipes created yet!</p>
                                </div>
                                )}
                                <RecipeCard myRecipes={myRecipes} myRecipesView={myRecipesView}/>
                            </>
                        ) : myGroupsView ? (
                            <>
                                {myGroups && myGroups.length === 0 && (
                                    <div className="empty-message">
                                        <p>No groups joined yet!</p>
                                    </div>
                                )}
                                <GroupCard myGroups={myGroups} myGroupsView={myGroupsView} toggleMyGroups={toggleMyGroups} />  
                            </>  
                        ) : mySavesView && (
                            <>
                                {mySaves && mySaves.length === 0 && (
                                    <div className="empty-message">
                                        <p>No recipes saved yet!</p>
                                    </div>
                                )}
                                <RecipeCard mySaves={mySaves} mySavesView={mySavesView} />
                            </>   
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;