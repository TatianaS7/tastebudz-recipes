import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/home.css";

import axios from "axios";
import apiURL from "../api"

import RecipeCardWrapper from "./RecipeCardWrapper";
import GroupCard from "./GroupCard";
import CreateGroup from "./CreateGroup";
import CreateRecipe from "./CreateRecipe";



function Home({ userData, allRecipes, defaultView, setDefaultView, fetchUser, refreshSaves, setRefreshSaves, mySavedRecipes, setMySavedRecipes, mySavesView, setMySavesView }) {
    const { user } = useAuth0();
    const [myRecipesView, setMyRecipesView] = useState(false);
    const [myGroupsView, setMyGroupsView] = useState(false);
    const [createGroupView, setCreateGroupView] = useState(false);
    const [createRecipeView, setCreateRecipeView] = useState(false);

    const [myGroupsRecipes, setMyGroupsRecipes] = useState([]);
    
    

    // Toggle My Recipes View
    function toggleMyRecipes() {
        setMyRecipesView(true);
        setDefaultView(false);
        setCreateGroupView(false);
        setCreateRecipeView(false);
        setMyGroupsView(false);
    }


    // Toggle My Groups View
    function toggleMyGroups() {
        setMyGroupsView(true);
        setDefaultView(false);
        setMyRecipesView(false);
        setCreateGroupView(false);
        setMySavesView(false);
        setCreateRecipeView(false);
    }

    // Toggle My Saves View
    function toggleMySaves() {
        setMySavesView(true);
        setDefaultView(false);
        setMyRecipesView(false);
        setMyGroupsView(false);
        setCreateGroupView(false);
        setCreateRecipeView(false);
    }

    // Toggle Create Group View
    function toggleCreateGroup() {
        setCreateGroupView(true);
        setDefaultView(false);
        setMyRecipesView(false);
        setMyGroupsView(false);
        setMySavesView(false);
        setCreateRecipeView(false);
    }

    // Toggle Create Recipe View
    function toggleCreateRecipe() {
        setCreateRecipeView(true);
        setDefaultView(false);
        setMyRecipesView(false);
        setMyGroupsView(false);
        setMySavesView(false);
        setCreateGroupView(false);
    }

    // Capture My Groups Recipes to Display in Default View
    useEffect(() => {
        if (defaultView) {
            fetchUser(user);
            if (userData.groups && userData.groups.length > 0) {
                const recipes = [];
                userData.groups.forEach(group => {
                    group.recipes.forEach(recipe => {
                        recipes.push(recipe);
                    })
                })
                setMyGroupsRecipes(recipes);
            } else if (allRecipes && allRecipes.length > 0) {
                setMyGroupsRecipes(allRecipes);
            }
        }
    }, [defaultView, userData.groups, allRecipes, fetchUser, user]);

    return (
        <section>
            <h4 id="welcome">Welcome Back, {user.given_name}!</h4>

            <div className="flex-container">
                <div className="action-buttons">
                    <button id="public-recipes" onClick={() => setDefaultView(true)}>Home</button><hr/>
                    <button id="create-recipe" onClick={toggleCreateRecipe}>Create a Recipe</button>
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
                        ) : myRecipesView ? (
                            <h5>My Recipes</h5>
                        ) : myGroupsView ? (
                            <h5>My Groups</h5>
                        ) : mySavesView && (
                            <h5>My Saves</h5>
                        )}
                    </div>
                    <div className="feed">
                        {/*  Default View is recipes from groups user is in */}
                        {defaultView ? (
                            // console.log("Group Data", userData.groups[0].recipes)
                                <RecipeCardWrapper myGroupsRecipes={myGroupsRecipes} defaultView={defaultView}/>
                        ) : createGroupView ? (
                                <CreateGroup fetchUser={fetchUser} toggleMyGroups={toggleMyGroups}/>
                        ) : createRecipeView ? (
                                <CreateRecipe fetchUser={fetchUser} toggleMyRecipes={toggleMyRecipes}/>
                        ) : myRecipesView ? (
                            <>
                                {userData.created_recipes && userData.created_recipes.length === 0 && (
                                <div className="empty-message">
                                    <p>No recipes created yet!</p>
                                </div>
                                )}
                                <RecipeCardWrapper myRecipes={userData.created_recipes} myRecipesView={myRecipesView}/>
                            </>
                        ) : myGroupsView ? (
                            <>
                                {userData.groups && userData.groups.length === 0 && (
                                    <div className="empty-message">
                                        <p>No groups joined yet!</p>
                                    </div>
                                )}
                                <GroupCard myGroups={userData.groups} myGroupsView={myGroupsView} setMyGroupsView={setMyGroupsView} toggleMyGroups={toggleMyGroups} fetchUser={fetchUser} refreshSaves={refreshSaves} setRefreshSaves={setRefreshSaves} mySaves={mySavedRecipes} setMySavedRecipes={setMySavedRecipes} mySavesView={mySavesView} setMySavesView={setMySavesView} />  
                            </>  
                        ) : mySavesView && (
                            <>
                                {mySavedRecipes && mySavedRecipes.length === 0 || mySavedRecipes === undefined ? (
                                    <div className="empty-message">
                                        <p>No recipes saved yet!</p>
                                    </div>
                                ) : (
                                    <RecipeCardWrapper mySaves={mySavedRecipes} mySavesView={mySavesView} toggleMySaves={toggleMySaves} fetchUser={fetchUser} refreshSaves={refreshSaves} setRefreshSaves={setRefreshSaves} setMySavedRecipes={setMySavedRecipes}/>
                                )}
                            </>   
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;