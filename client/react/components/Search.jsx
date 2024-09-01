import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-bootstrap/Modal";

import "../styles/search.css";

import RecipeCardWrapper from "./RecipeCardWrapper";
import GroupCard from "./GroupCard";
import Categories from "./Categories";


function Search({ getAllRecipes, allRecipes, searchRecipes, searchedRecipes, searchGroups, searchedGroups, joinGroup, setHomeView, homeView, searchView, fetchUser, refreshSaves, setRefreshSaves, mySavedRecipes, setMySavedRecipes, mySavesView, setMySavesView }) {
    const [query, setQuery] = useState("");
    const [searchType, setSearchType] = useState("recipes");

    function handleQueryChange(event) {
        setQuery(event.target.value);
    }

    useEffect(() => {
        if (query.length > 0) {
            if (searchType === 'recipes') {
                searchRecipes(query)
            } else {
                searchGroups(query);
            }
        }
    }, [query, searchType]);


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

    useEffect(() => {
        if (searchView) {
            getAllRecipes();
            console.log(allRecipes);
        }
    }, [searchView]);

    return (
        <div id="search-page">
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

        {searchType === 'recipes' && searchView &&
            <Categories 
                allRecipes={allRecipes} 
                searchType={searchType} 
                fetchUser={fetchUser} 
                searchView={searchView} 
                searchedRecipes={searchedRecipes}
                refreshSaves={refreshSaves} 
                setRefreshSaves={setRefreshSaves} 
                mySaves={mySavedRecipes} 
                setMySavedRecipes={setMySavedRecipes}
                mySavesView={mySavesView}
                setMySavesView={setMySavesView}/>        
        }

        {searchType === 'recipes' && searchView && 
            <RecipeCardWrapper 
            searchType={searchType}
            fetchUser={fetchUser} 
            searchView={searchView}
            allRecipes={allRecipes}
            searchedRecipes={searchedRecipes} 
            refreshSaves={refreshSaves} 
            setRefreshSaves={setRefreshSaves} 
            mySaves={mySavedRecipes} 
            setMySavedRecipes={setMySavedRecipes} 
            mySavesView={mySavesView} 
            setMySavesView={setMySavesView} />
        }
        {searchedGroups.length > 0 && searchType === 'groups' &&
            <GroupCard 
                searchedGroups={searchedGroups} 
                joinGroup={joinGroup} 
                setHomeView={setHomeView} 
                homeView={homeView} 
                fetchUser={fetchUser} 
                refreshSaves={refreshSaves} 
                setRefreshSaves={setRefreshSaves} 
                mySaves={mySavedRecipes} 
                setMySavedRecipes={setMySavedRecipes} 
                mySavesView={mySavesView} 
                setMySavesView={setMySavesView}/>
        }
        </div>
    );
}

export default Search;