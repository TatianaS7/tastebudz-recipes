import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BookmarkOutline } from "react-ionicons";
import { Bookmark } from 'react-ionicons'

import axios from "axios";
import apiURL from "../api"


function Saves({ fetchUser, toggleMySaves, recipe, mySaves, refreshSaves, setRefreshSaves }) {
    const { user, isLoading } = useAuth0();
    const [isSaved, setIsSaved] = useState(false);
    const [currSaveID, setCurrSaveID] = useState(null);

    // Check if Recipe is Saved
    useEffect(() => {
        // If mySaves is empty, return
        if (!mySaves) 
            return;

        // Otherwise, find the save in mySaves that matches the recipe id
        const save = mySaves.find((save) => save.id === recipe.id);

        // If save exists, set isSaved to true and set currSaveID
        if (save) {
            // console.log(save);
            setIsSaved(true);
            setCurrSaveID(save.save_id);

        // Otherwise, set isSaved to false
        } else {
            setIsSaved(false);
            setCurrSaveID(null);
        }
    }, [mySaves, recipe.id]); // Run this effect whenever mySaves or recipe.id changes


    // Save Recipe Function
    async function saveRecipe(recipe) {
        try {
            const res = await axios.post(`${apiURL}/saves/add`, {
                recipe_id: recipe.id,
                saved_by: user.email,
            })
            // console.log(res.data);
            setRefreshSaves(true);
            setIsSaved(true);
            setCurrSaveID(null)
        } catch (err) {
            console.error(err)
        }
    }

    // Unsave Recipe Function
    async function unsaveRecipe(currSaveID) {
        try {
            const res = await axios.delete(`${apiURL}/saves/${currSaveID}/delete`, {
                data: { saved_by: user.email }
            })
            // console.log(res.data);
            setRefreshSaves(true);
            setIsSaved(false);
            setCurrSaveID(null);
            console.log(mySaves);
        } catch (error) {
            console.error(error)
        }
    }

    // Handle Unsave Button Click
    function handleUnsaveClick() {
        if (currSaveID) {
            unsaveRecipe(currSaveID);
        }
    }

    // Fetch user data and reset refreshSaves
    useEffect(() => {
        if (refreshSaves) {
            // fetchUser(user);
            // toggleMySaves();
            setRefreshSaves(false);
            // console.log(mySaves);
        }
    }, [refreshSaves, fetchUser, toggleMySaves, user]);

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            {isSaved ? (
                <button id="unsave-recipe" className="btn btn-outline-dark" onClick={handleUnsaveClick}>
                    <Bookmark color={'#ad78de'} height="25px" width="25px" />
                </button>
            ) : (
                <button id="save-recipe" className="btn btn-outline-dark" onClick={() => saveRecipe(recipe)}>
                    <BookmarkOutline color={'#ad78de'} height="25px" width="25px" />
                </button>
            )}
        </>
    )
}

export default Saves;