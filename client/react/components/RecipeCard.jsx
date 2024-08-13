import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/recipeCard.css";
import { TimeOutline } from 'react-ionicons'
import { PeopleOutline } from 'react-ionicons'
import { BookmarkOutline } from 'react-ionicons'
import { EyeOutline } from 'react-ionicons'

function RecipeCard({ searchedRecipes, allRecipes, defaultView, myRecipes, myRecipesView, groupRecipes, expandGroupView }) {
    const { user, isAuthenticated } = useAuth0();

    return (
        <div id={defaultView || myRecipesView || expandGroupView ? "all-recipes" : "recipe-results"}>
        {searchedRecipes ? searchedRecipes.map((recipe, index) => {
            return (
                <div key={index} className="recipe">
                    {isAuthenticated ? (
                        <div className="recipe-header">
                            <h3>{recipe.name}</h3>
                            <div className="right-side">
                                <button className="open-recipe"><EyeOutline color={'#ad78de'} height="25px" width="25px" /></button>
                                <button id="save-recipe" className="btn btn-outline-dark"><BookmarkOutline color={'#ad78de'} height="25px" width="25px"/></button>
                            </div>
                        </div>
                    ) :
                        <h3>{recipe.name}</h3>
                    }
                    <p className="user">Created by: {recipe.user}</p>
                    <div className="stats">
                        {recipe.time && <div className="time"><TimeOutline color={'#ad78de'} height="22px" width="22px"/> <p>{recipe.time} mins</p></div>}
                        {recipe.servings && <div className="servings"><PeopleOutline color={'#ad78de'} height="22px" width="22px"/><p>{recipe.servings} servings</p></div>}
                    </div>
                    <div className="body">
                        <div className="ingredients">
                            <h4>Ingredients</h4>
                            <div className="scroll-div">
                            {recipe.ingredients.map((ingredient, index) => {
                                return (
                                    <div className="recipe-ingredient" key={index}>
                                        <li>{ingredient.quantity} {ingredient.ingredient}</li>
                                    </div>
                                );
                            })}
                            </div>
                        </div>
                        <div className="instructions">
                            <h4>Instructions</h4>
                            <div className="scroll-div">
                            <ol>
                            {recipe.instructions.map((index) => {
                                return (
                                    <div className="recipe-instruction" key={index}>
                                        <li> {index}</li>
                                    </div>
                                );})}
                            </ol>
                            </div>
                        </div>
                    </div>
                    <div className="footer tags">
                        {recipe.tags.map((tag, index) => {
                            return (
                                <p key={index}>#{tag}</p>
                            );
                        })}
                    </div>
                </div>
            );
        }) : defaultView ? allRecipes.map((recipe, index) => {
            return (
                <div key={index} className="recipe">
                        <div className="recipe-header">
                            <h3>{recipe.name}</h3>
                            <div className="right-side">
                                <button className="open-recipe"><EyeOutline color={'#ad78de'} height="25px" width="25px" /></button>
                                <button id="save-recipe" className="btn btn-outline-dark"><BookmarkOutline color={'#ad78de'} height="25px" width="25px"/></button>
                            </div>
                        </div>
                    <p className="user">Created by: {recipe.user}</p>
                    <div className="stats">
                        {recipe.time && <div className="time"><TimeOutline color={'#ad78de'} height="22px" width="22px"/> <p>{recipe.time} mins</p></div>}
                        {recipe.servings && <div className="servings"><PeopleOutline color={'#ad78de'} height="22px" width="22px"/><p>{recipe.servings} servings</p></div>}
                    </div>
                    <div className="body">
                        <div className="ingredients">
                            <h4>Ingredients</h4>
                            <div className="scroll-div">
                            {recipe.ingredients.map((ingredient, index) => {
                                return (
                                    <div className="recipe-ingredient" key={index}>
                                        <li>{ingredient.quantity} {ingredient.ingredient}</li>
                                    </div>
                                );
                            })}
                            </div>
                        </div>
                        <div className="instructions">
                            <h4>Instructions</h4>
                            <div className="scroll-div">
                                <ol>
                            {recipe.instructions.map((index) => {
                                return (
                                    <div className="recipe-instruction" key={index}>
                                        <li> {index}</li>
                                    </div>
                                );
                            })}
                            </ol>
                            </div>
                        </div>
                    </div>
                    <div className="footer tags">
                        {recipe.tags.map((tag, index) => {
                            return (
                                <p key={index}>#{tag}</p>
                            );
                        })}
                    </div>
                </div>
            );
        }
        ) : myRecipesView ? myRecipes.map((recipe, index) => {
            return (
                <div key={index} className="recipe">
                        <div className="recipe-header">
                            <h3>{recipe.name}</h3>
                            <div className="right-side">
                                <button className="open-recipe"><EyeOutline color={'#ad78de'} height="25px" width="25px" /></button>
                            </div>
                        </div>
                    <p className="user">Created by: {recipe.user}</p>
                    <div className="stats">
                        {recipe.time && <div className="time"><TimeOutline color={'#ad78de'} height="22px" width="22px"/> <p>{recipe.time} mins</p></div>}
                        {recipe.servings && <div className="servings"><PeopleOutline color={'#ad78de'} height="22px" width="22px"/><p>{recipe.servings} servings</p></div>}
                    </div>
                    <div className="body">
                        <div className="ingredients">
                            <h4>Ingredients</h4>
                            <div className="scroll-div">
                            {recipe.ingredients.map((ingredient, index) => {
                                return (
                                    <div className="recipe-ingredient" key={index}>
                                        <li>{ingredient.quantity} {ingredient.ingredient}</li>
                                    </div>
                                );
                            })}
                            </div>
                        </div>
                        <div className="instructions">
                            <h4>Instructions</h4>
                            <div className="scroll-div">
                            <ol>
                            {recipe.instructions.map((index) => {
                                return (
                                    <div className="recipe-instruction" key={index}>
                                        <li> {index}</li>
                                    </div>
                                );
                            })}
                            </ol>
                            </div>
                        </div>
                    </div>
                    <div className="footer tags">
                        {recipe.tags.map((tag, index) => {
                            return (
                                <p key={index}>#{tag}</p>
                            );
                        })}
                    </div>
                </div>
            );
        }
        ) : expandGroupView && groupRecipes && groupRecipes.map(recipe => {
            return (
                <div key={recipe.id} className="recipe">
                        <div className="recipe-header">
                            <h3>{recipe.name}</h3>
                            <div className="right-side">
                                {/* <button className="open-recipe"><EyeOutline color={'#ad78de'} height="25px" width="25px" /></button> */}
                                <button id="save-recipe" className="btn btn-outline-dark"><BookmarkOutline color={'#ad78de'} height="25px" width="25px"/></button>
                            </div>
                        </div>
                    <p className="user">Created by: {recipe.user}</p>
                    <div className="stats">
                        {recipe.time && <div className="time"><TimeOutline color={'#ad78de'} height="22px" width="22px"/> <p>{recipe.time} mins</p></div>}
                        {recipe.servings && <div className="servings"><PeopleOutline color={'#ad78de'} height="22px" width="22px"/><p>{recipe.servings} servings</p></div>}
                    </div>
                    <div className="body">
                        <div className="ingredients">
                            <h4>Ingredients</h4>
                            <div className="scroll-div">
                            {recipe.ingredients.map((ingredient, index) => {
                                return (
                                    <div className="recipe-ingredient" key={index}>
                                        <li>{ingredient.quantity} {ingredient.ingredient}</li>
                                    </div>
                                );
                            })}
                            </div>
                        </div>
                        <div className="instructions">
                            <h4>Instructions</h4>
                            <div className="scroll-div">
                            <ol>
                            {recipe.instructions.map((index) => {
                                return (
                                    <div className="recipe-instruction" key={index}>
                                        <li> {index}</li>
                                    </div>
                                );
                            })}
                            </ol>
                            </div>
                        </div>
                    </div>
                    <div className="footer tags">
                        {recipe.tags.map((tag, index) => {
                            return (
                                <p key={index}>#{tag}</p>
                            );
                        })}
                    </div>
                </div>
            );
            }
        )}
    </div>

    )
}

export default RecipeCard;