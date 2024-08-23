import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";
import apiURL from "../api";

import "../styles/recipeCard.css";
import { TimeOutline, PeopleOutline, EyeOutline } from 'react-ionicons'
import Saves from "./Saves";


function RecipeCard({ recipes, viewType, toggleMySaves, mySaves, fetchUser, refreshSaves, setRefreshSaves, setMySavedRecipes, mySavesView, expandGroupView, groupRecipes, showDetails }) {
    const { isAuthenticated, user } = useAuth0();

        // Fetch User Saves
        async function fetchUserSaves(user) {
            try {
                const res = await axios.post(`${apiURL}/saves/all`, {
                    saved_by: user.email
                })
                const data = res.data;
                setMySavedRecipes(data.saves);
            } catch (error) {
                console.error(error);
            }
        }
    
        useEffect(() => {
            if (mySavesView || refreshSaves || showDetails && groupRecipes ) {
                fetchUserSaves(user);
                setRefreshSaves(false);
                fetchUser(user);
            }
        }, [mySavesView, refreshSaves, showDetails, groupRecipes]);


    // Open Recipe Modal
    function openRecipe(recipe) {
        console.log(recipe);
    }
    

    return (
        <div id={viewType === "defaultView" || viewType === "myRecipes" || viewType === "group" || viewType === "mySaves" ? "all-recipes" : "recipe-results"}>
            {recipes && recipes.map((recipe, index) => {
                return (
                <div key={index} className="recipe">
                    {isAuthenticated ? (
                    <div className="recipe-header">
                        <h3>{recipe.name}</h3>
                        <div className="right-side">
                            {isAuthenticated && <button className="open-recipe" onClick={() => openRecipe(recipe)}><EyeOutline color={'#ad78de'} height="25px" width="25px" /></button>}
                            {(viewType !== "myRecipes") && <Saves key={recipe.id} recipe={recipe} toggleMySaves={toggleMySaves} mySaves={mySaves} fetchUser={fetchUser} refreshSaves={refreshSaves} setRefreshSaves={setRefreshSaves}/>}
                        </div>
                    </div>
                    ) : <h3>{recipe.name}</h3>}
                    <p className="user">Created by: {recipe.user}</p>
                    <div className="stats">
                        {recipe.time && <div className="time"><TimeOutline color={'#ad78de'} height="22px" width="22px" /> <p>{recipe.time} mins</p></div>}
                        {recipe.servings && <div className="servings"><PeopleOutline color={'#ad78de'} height="22px" width="22px" /><p>{recipe.servings} servings</p></div>}
                    </div>
                    <div className="body">
                        <div className="ingredients">
                            <h4>Ingredients</h4>
                            <div className="scroll-div">
                                {recipe.ingredients.map((ingredient, idx) => (
                                    <div className="recipe-ingredient" key={idx}>
                                        <li>{ingredient.quantity} {ingredient.ingredient}</li>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="instructions">
                            <h4>Instructions</h4>
                            <div className="scroll-div">
                                <ol>
                                    {recipe.instructions.map((instruction, idx) => (
                                        <div className="recipe-instruction" key={idx}>
                                            <li>{instruction}</li>
                                        </div>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div className="footer tags">
                        {recipe.tags.map((tag, idx) => (
                            <p key={idx}>#{tag}</p>
                        ))}
                    </div>
                </div>
            )})}
        </div>
    );
}


export default RecipeCard;