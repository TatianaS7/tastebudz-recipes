import React from "react";

import RecipeCard from "./RecipeCard";

function RecipeCardWrapper({
  searchedRecipes,
  allRecipes,
  defaultView,
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

  if (searchedRecipes) {
    recipes = searchedRecipes;
    viewType = "search";
  } else if (defaultView) {
    recipes = allRecipes;
    viewType = "defaultView";
  } else if (myRecipesView) {
    recipes = myRecipes;
    viewType = "myRecipes";
  } else if (mySavesView) {
    recipes = mySaves;
    viewType = "mySaves";
  } else if (expandGroupView && groupRecipes) {
    recipes = groupRecipes;
    viewType = "group";
  }

  return (
    <RecipeCard
      recipes={recipes}
      viewType={viewType}
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
  );
}

export default RecipeCardWrapper;
