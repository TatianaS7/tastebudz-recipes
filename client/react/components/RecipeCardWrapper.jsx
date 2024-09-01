import React from "react";

import RecipeCard from "./RecipeCard";

function RecipeCardWrapper({
  searchType,
  filteredRecipes,
  searchedRecipes,
  // allRecipes,
  searchView,
  defaultView,
  myGroupsRecipes,
  myRecipes,
  myRecipesView,
  groupRecipes,
  expandGroupView,
  showDetails,
  mySaves,
  mySavesView,
  toggleMySaves,
  fetchUser,
  refreshSaves,
  setRefreshSaves,
  setMySavedRecipes
}) {
  let recipes = [];
  let viewType = "";

  // The user is viewing all of their groups' recipes
  if (defaultView && myGroupsRecipes) {
    console.log("myGroupsRecipes", myGroupsRecipes);
    recipes = myGroupsRecipes;
    viewType = "myGroupsRecipes";
    // The user is viewing recipes returned from a search
  } else if (searchedRecipes && searchedRecipes.length > 0) {
    console.log("searchedRecipes", searchedRecipes);
    recipes = searchedRecipes;
    viewType = "search";
    // The user is viewing recipes filtered by category or all recipes
  } else if (searchView && searchType === "recipes") {
    console.log("filteredRecipes", filteredRecipes);
    recipes = filteredRecipes;
    viewType = "allRecipes";
    // The user is viewing recipes that they created
  } else if (myRecipesView) {
    console.log("myRecipes", myRecipes);
    recipes = myRecipes;
    viewType = "myRecipes";
    // The user is viewing their recipes that they saved
  } else if (mySavesView) {
    console.log("mySaves", mySaves);
    recipes = mySaves;
    viewType = "mySaves";
    // The user is viewing a group's recipes
  } else if (expandGroupView && groupRecipes) {
    console.log("groupRecipes", groupRecipes);
    recipes = groupRecipes;
    viewType = "group";
  }

  return (
    <div id={ viewType === "myGroupsRecipes" || viewType === "myRecipes" || viewType === "group" || viewType === "mySaves" ? "all-recipes" : "recipe-results"}>
      {recipes && recipes.map((recipe, index) => (
        <RecipeCard
          key={index}
          recipe={recipe}
          viewType={viewType}
          searchView={searchView}
          toggleMySaves={toggleMySaves}
          showDetails={showDetails}
          groupRecipes={groupRecipes}
          fetchUser={fetchUser}
          mySaves={mySaves}
          mySavesView={mySavesView}
          refreshSaves={refreshSaves}
          setRefreshSaves={setRefreshSaves}
          setMySavedRecipes={setMySavedRecipes}
        />
      ))}
    </div>
  )
}

export default RecipeCardWrapper;
