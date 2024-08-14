import React from "react";

import RecipeCard from "./RecipeCard";


function RecipeCardWrapper({ searchedRecipes, allRecipes, defaultView, myRecipes, myRecipesView, groupRecipes, expandGroupView }) {

    let recipes = [];
    let viewType = "";

    if (searchedRecipes) {
        recipes = searchedRecipes;
        viewType = "search";
    } else if (defaultView) {
        recipes = allRecipes;
        viewType = "defaultView";
    } else if (myRecipesView) {
        recipes = myRecipes;
        viewType = "myRecipes";
    } else if (expandGroupView && groupRecipes) {
        recipes = groupRecipes;
        viewType = "group";
    }
        
    return (
        <RecipeCard recipes={recipes} viewType={viewType} />
    );
}

export default RecipeCardWrapper;