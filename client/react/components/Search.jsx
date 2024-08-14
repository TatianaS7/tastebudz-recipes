import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-bootstrap/Modal";

import "../styles/search.css";

import RecipeCardWrapper from "./RecipeCardWrapper";
import GroupCard from "./GroupCard";


function Search({ searchRecipes, searchedRecipes, searchGroups, searchedGroups, joinGroup, setHomeView, homeView, fetchUser }) {
    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("recipes");

    function handleQueryChange(event) {
        setQuery(event.target.value);
    }

    useEffect(() => {
        query.length > 0 && searchType === 'recipes' ? 
            searchRecipes(query) : 
        searchGroups(query);
    }, [query]);


    function handleRecipeSearchClick(query) {
        searchRecipes(query);
    }

    function handleGroupSearchClick(query) {
        searchGroups(query);
    }


    function handleSearchTypeChange(type) {
        setSearchType(type);
        setQuery("");
    }

    return (
        <content>
        <div id="search-buttons">
            <button id="search-recipe-view" value={'recipes'} onClick={() => handleSearchTypeChange('recipes')}>Search Recipes</button>
            <button id="search-group-view" value={'groups'} onClick={() => handleSearchTypeChange('groups')}>Search Groups</button>
        </div>
        <div id="search-container">
            {searchType === "recipes" ? (
                <>
                    <input id="searchbar" type="text" placeholder="Search Recipes..." onChange={handleQueryChange}></input>
                    <button className="btn btn-outline-dark" id="submit-recipe-search" onClick={() => handleRecipeSearchClick(query)}>Search</button>
                </>
            ) : searchType === 'groups' && (
                <>
                    <input id="searchbar" type="text" placeholder="Search Groups..." onChange={handleQueryChange}></input>
                    <button className="btn btn-outline-dark" id="submit-group-search" onClick={() => handleGroupSearchClick(query)}>Search</button>
                </>
            )}
        </div>
        {searchedRecipes.length > 0 && searchType === 'recipes' &&
            <RecipeCardWrapper searchedRecipes={searchedRecipes} />
        }
        {searchedGroups.length > 0 && searchType === 'groups' &&
            <GroupCard searchedGroups={searchedGroups} joinGroup={joinGroup} setHomeView={setHomeView} homeView={homeView} fetchUser={fetchUser} />
        }
        </content>
    );
}

export default Search;