import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Modal from "react-bootstrap/Modal";

import "../styles/search.css";

import RecipeCard from "./RecipeCard";


function Search({ searchView, setSearchView, searchRecipes, searchedRecipes, setSearchedRecipes }) {
    const [query, setQuery] = useState("");
    const [show, setShow] = useState(false);
    const [searchType, setSearchType] = useState("recipes");

    function handleQueryChange(event) {
        setQuery(event.target.value);
    }

    function handleRecipeSearchClick(query) {
        searchRecipes(query);
    }

    function handleGroupSearchClick(query) {
        searchGroups(query);
    }


    function handleClose() {
        setShow(false);
        setQuery("");
    }

    useEffect(() => {
        if (searchView) {
            setShow(true);
        }
    }, [searchView])

    function handleSearchTypeChange(type) {
        setSearchType(type);
    }

    return (
        <section>
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
        {searchedRecipes.length > 0 &&
            <RecipeCard searchedRecipes={searchedRecipes} />
        }
        </section>
    );
}

export default Search;