import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "react-bootstrap";

import "../styles/createRecipe.css";
import axios from "axios";
import apiURL from "../api";

function CreateRecipe({ fetchUser, toggleMyRecipes }) {
    const { user } = useAuth0();
    const [show, setShow] = useState(false);
    const [newRecipeData, setNewRecipeData] = useState({
        name: '',
        ingredients: [{
            quantity: '',
            ingredient: ''
        }],
        instructions: '',
        servings: null,
        time: null,
        image: null,
        tags: '',
        user: user.email,
        group_id: null,
        is_public: true
    });

    // Handle Input Change
    function handleInputChange(event, index) {
        const { name, value } = event.target;
        if (name === "quantity" || name === "ingredient") {
            const ingredients = [...newRecipeData.ingredients];
            ingredients[index][name] = value;
            setNewRecipeData((prevState) => ({
                ...prevState,
                ingredients
            }));
        } else {
            setNewRecipeData((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    // Handle Create Recipe Form Submit
    async function handleCreateRecipe(event) {
        event.preventDefault();

        if (newRecipeData) {
            try {
                // Split Instructions and Tags into Arrays by Comma
                const recipeData = {
                    ...newRecipeData,
                    instructions: newRecipeData.instructions.split(',').map(item => item.trim()),
                    tags: newRecipeData.tags.split(',').map(item => item.trim())
                };
                await createRecipe(recipeData);
                setNewRecipeData({
                    name: '',
                    ingredients: [{
                        quantity: '',
                        ingredient: ''
                    }],
                    instructions: '',
                    servings: null,
                    time: null,
                    image: null,
                    tags: '',
                    user: user.email,
                    group_id: null,
                    is_public: true
                });
                setShow(false);
                fetchUser(user);
                toggleMyRecipes();
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log("Please fill out all fields");
        }
    }

    // General Create Recipe Function
    async function createRecipe(recipeData) {
        try {
            const res = await axios.post(`${apiURL}/recipes/`, recipeData);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Add Ingredient Row
    function addIngredientRow() {
        // Copy Ingredients Array
        const ingredients = [...newRecipeData.ingredients];
        // Adds New Ingredient Object to Ingredients Array
        ingredients.push({
            quantity: '',
            ingredient: ''
        });
        // Sets New Recipe Data State
        setNewRecipeData((prevState) => ({
            ...prevState,
            ingredients
        }));
    }

    // Remove Ingredient Row
    function removeIngredientRow(index) {
        // Copy Ingredients Array
        const ingredients = [...newRecipeData.ingredients];
        // Removes Ingredient Object from Ingredients Array at Index
        ingredients.splice(index, 1);
        // Sets New Recipe Data State
        setNewRecipeData((prevState) => ({
            ...prevState,
            ingredients
        }));
    }


    return (
        <>
            <Modal show={() => show(true)} onHide={toggleMyRecipes} centered size="lg" style={{ background: "none", height: 'fit-content' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="create-recipe-form" onSubmit={handleCreateRecipe}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div id="left">
                                <label>Name</label><br />
                                <input id="recipe-name" type="text" name="name" placeholder="Chicken Alfredo" value={newRecipeData.name} onChange={handleInputChange}>
                                </input><hr />
                                <label>Ingredients</label>
                                <button id="add-ingredient-btn" type="button" onClick={addIngredientRow}>Add Ingredient</button>
                                <div id="ingredients-div">
                                    {newRecipeData.ingredients.map((ingredient, index) => (
                                        <div key={index} className="ingredient-row">
                                            <div id="qty-input">
                                                <label>Qty</label><br />
                                                <input
                                                    id={`recipe-quantity-${index}`} type="text" name="quantity" placeholder="1 tbsp" value={ingredient.quantity} onChange={(event) => handleInputChange(event, index)}
                                                ></input><br />
                                            </div>
                                            <div id="ingredient-input">
                                                <label>Ingredient</label><br />
                                                <input
                                                    id={`recipe-ingredient-${index}`}type="text" name="ingredient" placeholder="Butter" value={ingredient.ingredient} onChange={(event) => handleInputChange(event, index)}
                                                ></input>
                                                <button className="btn btn-light" id="remove-ingredient-btn" type="button" onClick={() => removeIngredientRow(index)}>Remove</button>
                                            </div>
                                        </div>
                                    ))}
                                </div><br/>
                                <label>Instructions</label><br />
                                <textarea
                                    id="recipe-instructions" type="text" name="instructions" placeholder="Step 1, Step 2, Step 3" value={newRecipeData.instructions} onChange={handleInputChange} cols={45} rows={3}>
                                </textarea><br/>
                            </div>
                            <div id="right">
                                <label>Servings</label><br />
                                <input
                                    id="recipe-servings" type="number" name="servings" placeholder="4" value={newRecipeData.servings} onChange={handleInputChange}>
                                </input><br />
                                <label>Time</label><br />
                                <input
                                    id="recipe-time" type="number" name="time" placeholder="45" value={newRecipeData.time} onChange={handleInputChange}>
                                </input><br />
                                <label>Tags</label><br />
                                <textarea
                                    id="recipe-tags" type="text" name="tags" placeholder="dinner, pasta, chicken, creamy" value={newRecipeData.tags} onChange={handleInputChange} rows={5}>
                                </textarea><br/>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: 'whitesmoke' }}>
                    <button id="submit-recipe-btn" className="btn btn-light" type="submit" onClick={handleCreateRecipe}>Create Recipe</button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CreateRecipe;