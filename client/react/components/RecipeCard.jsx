import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";
import apiURL from "../api";

import "../styles/recipeCard.css";
import { TimeOutline, PeopleOutline, EyeOutline } from 'react-ionicons'
import Saves from "./Saves";
import RecipeDetails from "./RecipeDetails";


function RecipeCard({ recipes, viewType, toggleMySaves, mySaves, fetchUser, refreshSaves, setRefreshSaves, setMySavedRecipes, mySavesView, expandGroupView, groupRecipes, showDetails }) {
    const { isAuthenticated, user } = useAuth0();

    const [showRecipe, setShowRecipe] = useState(false);
    const [currRecipe, setCurrRecipe] = useState(null);

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
        setCurrRecipe(recipe);
        setShowRecipe(true);
        console.log(recipe);
    }
    

    return (
        <div id={viewType === "defaultView" || viewType === "myRecipes" || viewType === "group" || viewType === "mySaves" ? "all-recipes" : "recipe-results"}>
            {recipes && recipes.map((recipe, index) => {
                return (
                    <div key={index} className="recipe">
                        <div className="recipe-header">
                            <div className="left-side">
                                {recipe.image &&
                                <div className="img-div">
                                    <img src={recipe.image} alt="recipe" />
                                </div>
                                }
                                <div className="name-div">
                                    <h3>{recipe.name}</h3>
                                    <p className="user">Created by: {recipe.user}</p>

                                    <div className="stats">
                                        {recipe.time && <div className="time"><TimeOutline color={'#ad78de'} height="22px" width="22px" /> <p>{recipe.time} mins</p></div>}
                                        {recipe.servings && <div className="servings"><PeopleOutline color={'#ad78de'} height="22px" width="22px" /><p>{recipe.servings} servings</p></div>}
                                    </div>

                                </div>

                            </div>

                            <div className="right-side">
                                <button className="open-recipe" onClick={() => openRecipe(recipe)}><EyeOutline color={'#ad78de'} height="30px" width="30px" /></button>
                                
                                {isAuthenticated && (viewType !== "myRecipes") && 
                                    <Saves key={recipe.id} recipe={recipe} toggleMySaves={toggleMySaves} mySaves={mySaves} fetchUser={fetchUser} refreshSaves={refreshSaves} setRefreshSaves={setRefreshSaves}/>
                                }
                            </div>
                        </div><hr/>
                        <div className="ingredients-glance">
                            {recipe.ingredients.slice(0, 4).map((ingredient, idx) => (
                                <p key={idx}>{ingredient.ingredient}{idx < 3 && idx < recipe.ingredients.length - 1 ? ',' : ''}</p>
                            ))}
                        </div><br/>
                            <RecipeDetails key={recipe.id} recipe={recipe} toggleMySaves={toggleMySaves} mySaves={mySaves} fetchUser={fetchUser} refreshSaves={refreshSaves} setRefreshSaves={setRefreshSaves} currRecipe={currRecipe} setCurrRecipe={setCurrRecipe} showRecipe={showRecipe} setShowRecipe={setShowRecipe} viewType={viewType} />
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