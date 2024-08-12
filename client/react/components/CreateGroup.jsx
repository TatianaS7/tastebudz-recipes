import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/createGroup.css";
import axios from "axios";
import apiURL from "../api";


function CreateGroup({ fetchUser, toggleMyGroups }) {
    const { user } = useAuth0();
    const [newGroupData, setNewGroupData] = useState({
        name: "",
        admin_email: user.email,
        is_private: false
    });

    // Handle Input Change
    function handleInputChange(event) {
        const { name, value } = event.target;
        setNewGroupData((prevState) => ({
            ...prevState,
            [name]: name === "is_private" ? value === "Private" : value
        }));
    };


    // Handle Create Group Form Submit
    async function handleCreateGroup(event) {
        event.preventDefault();
    
        if (newGroupData) {
            try {
                await createGroup();
                setNewGroupData({
                    name: "",
                    admin_email: user.email,
                    is_private: false
                });

                fetchUser(user);
                toggleMyGroups();
            } catch (error) {
                console.error(error);
            }        
        } else {
            console.log("Please fill out all fields");
        }
    }


    async function createGroup() {
        try {
            const res = await axios.post(`${apiURL}/groups/`, newGroupData);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    } 

    return (
        <>
            <form id="create-group-form" onSubmit={handleCreateGroup}>
                <label>Group Name</label><br/>
                    <input 
                        id="group-name" 
                        type="text" 
                        name="name"
                        placeholder="Enter Group Name" 
                        value={newGroupData.name} 
                        onChange={handleInputChange}>
                    </input><br/>
                    {newGroupData.name === "" ? <p className="error">Please enter a group name</p> : null}
                <label>Admin</label><br/>
                    <input id="group-email" type="text" value={user.email} readOnly></input><br/>
                <label>Group Privacy</label><br/>
                    <div>
                        <input type="radio" name="is_private" value="Private" checked={newGroupData.is_private === true} onChange={handleInputChange}/> Private <br/>
                        <input type="radio" name="is_private" value="Public" checked={newGroupData.is_private === false} onChange={handleInputChange}/> Public                   
                    </div>
                    <button className="btn btn-dark" type="submit">Create Group</button>
            </form>
        </>
    )
}

export default CreateGroup;