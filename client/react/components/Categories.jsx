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
        setCategories([]);

        // Loop through all recipes and push each tag to the tags array
        allRecipes.forEach(recipe => {
            recipe.tags.forEach(tag => {
                tags.push(tag);
            })
        });
        console.log(tags);

        // Create an object to store the count of each tag
        let tagCount = {};
        // Loop through the tags array and count the number of times each tag appears
        tags.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        });

        console.log(tagCount);

        // For each tag in the tagCount object, if the tag appears more than the average, add it to the categories list
        // Total tags is the length of the tags array
        let totalTags = tags.length;

        // Scaled average is the count for each tag divided by the number of tags        
        let scaledAverage = totalTags / Object.keys(tagCount).length;
        console.log(scaledAverage);

        // Loop through the tagCount object and add tags that appear more than the scaled average to the categories list
        for (let tag in tagCount) {
            if (tagCount[tag] > scaledAverage) {

                // If only one tag appears more than the average, it will be the only category
                // If multiple tags appear more than the average, they will all be categories
                setCategories([...categories, tag]);
            }
        }
        console.log(categories);
    }

    useEffect(() => {
        if (searchType === "recipes") {
            captureTags();
        }
    }
    , [searchType]);

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
                    <img src="https://media.istockphoto.com/id/146807105/photo/food-pyramid-pie-chart.jpg?s=612x612&w=0&k=20&c=SX0hFBaED3Wwi0G2pLfhsYN1GRjlyK8wzqHf-qUyJOk=" alt="all"></img>
                </button>
                <p>All</p>
            </div>

            {categories && categories.map((category, index) => (
                <div className="category" key={index}>
                    <button onClick={() => filterRecipesByCategory(category)}>
                        {categoryImages[category] ? (
                            <img src={categoryImages[category]} alt={category}></img>
                        ) : (
                            <img src="https://media.istockphoto.com/id/146807105/photo/food-pyramid-pie-chart.jpg?s=612x612&w=0&k=20&c=SX0hFBaED3Wwi0G2pLfhsYN1GRjlyK8wzqHf-qUyJOk=" alt={category}></img>
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