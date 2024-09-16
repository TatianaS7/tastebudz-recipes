import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";
import "../styles/categories.css";
import categoryImages from "../../assets/categoryImages.json";

import RecipeCardWrapper from "./RecipeCardWrapper";



function Categories({ allRecipes, searchType, fetchUser, searchView, searchedRecipes, refreshSaves, setRefreshSaves, mySaves, setMySavedRecipes, mySavesView, setMySavesView }) {
    // Function should return a list of categories based on most common tags in the database
    // Categories should be clickable and should filter the recipes displayed on the page
    
    const [categories, setCategories] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);

    function captureTags() {
        // Create an array to store all tags
        let tags = [];

        // Reset the categories array
        // setCategories([]);

        // Loop through all recipes and push each tag to the tags array
        allRecipes.forEach(recipe => {
            recipe.tags.forEach(tag => {
                tags.push(tag.toLowerCase());
            })
        });
        console.log(tags);

        // Create an object to store the count of each tag
        let tagCount = {};
        // Loop through the tags array and count the number of times each tag appears
        tags.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        });

        console.log("tag count:", tagCount);

        // For each tag in the tagCount object, if the tag appears more than the average, add it to the categories list
        // Total tags is the length of the tags array
        let totalTags = tags.length;

        // Scaled average is the count for each tag divided by the number of tags        
        let scaledAverage = totalTags / Object.keys(tagCount).length;
        console.log("scaled average:", scaledAverage);

        // Create an array to store the categories
        let newCategories = [];
        // Loop through the tagCount object and add tags that appear more than the scaled average to the categories list
        for (let tag in tagCount) {
            if (tagCount[tag] > scaledAverage) {
                newCategories.push(tag);
            }
        }
        console.log("new categories list:", newCategories);
        setCategories(newCategories);
    }

    useEffect(() => {
        if (searchType === "recipes" && allRecipes.length > 0) {
            captureTags();
        }
    }
    , [searchType, allRecipes]);

    // Filter Recipes by Category
    function filterRecipesByCategory(category) {
        // If the category is "All", return all recipes
        if (category === "All") {
            console.log(allRecipes);
            setFilteredRecipes(allRecipes);
        } else {
        // Filter the recipes array by the category
        let filtered = allRecipes.filter(recipe => recipe.tags.includes(category));
        console.log(filtered);
        setFilteredRecipes(filtered);
        }
    }


    return (
        <>
        <div id="categories">
            <div className="category">
                <button onClick={() => filterRecipesByCategory("All")}>
                    <img src="https://cdn.vox-cdn.com/thumbor/bif3U7XKUqWpOUv91_fXLfzsIx8=/0x0:6000x4000/1200x675/filters:focal(2520x1520:3480x2480)/cdn.vox-cdn.com/uploads/chorus_image/image/71262429/Le_Fantome.0.jpg" alt="all"></img>
                </button>
                <p>All</p>
            </div>

            {categories && categories.map((category, index) => (
                <div className="category" key={index}>
                    <button onClick={() => filterRecipesByCategory(category)}>
                        {categoryImages[category] ? (
                            <img src={categoryImages[category]} alt={category}></img>
                        ) : (
                            <img src="https://cdn.vox-cdn.com/thumbor/bif3U7XKUqWpOUv91_fXLfzsIx8=/0x0:6000x4000/1200x675/filters:focal(2520x1520:3480x2480)/cdn.vox-cdn.com/uploads/chorus_image/image/71262429/Le_Fantome.0.jpg" alt={category}></img>
                        )}
                    </button>
                    <p>{category}</p>
                </div>
            ))}
        </div>
            <RecipeCardWrapper searchType={searchType} filteredRecipes={filteredRecipes} fetchUser={fetchUser} searchView={searchView} searchedRecipes={searchedRecipes} refreshSaves={refreshSaves} setRefreshSaves={setRefreshSaves} mySaves={mySaves} setMySavedRecipes={setMySavedRecipes} mySavesView={mySavesView} setMySavesView={setMySavesView}  />
        </>
    )
}


export default Categories;