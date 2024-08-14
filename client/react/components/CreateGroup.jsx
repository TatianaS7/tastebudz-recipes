import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "react-bootstrap";

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
        <Modal show={true} onHide={toggleMyGroups} centered size="md" style={{background: "none", height: 'fit-content'}}>
            <Modal.Header closeButton>
                <Modal.Title>Create Group</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form id="create-group-form" onSubmit={handleCreateGroup}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div id="left">
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
                    </div>
                    <div id="right">
                        <label>Admin</label><br/>
                        <input id="group-email" type="text" value={user.email} readOnly></input><br/>
                    </div>
                    </div><hr/>
                    <label>Group Privacy</label><br/>
                        <div>
                            <input type="radio" name="is_private" value="Private" checked={newGroupData.is_private === true} onChange={handleInputChange}/> Private <br/>
                            <input type="radio" name="is_private" value="Public" checked={newGroupData.is_private === false} onChange={handleInputChange}/> Public                   
                        </div>
                </form>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: 'whitesmoke'}}>
                <button id="submit-group-btn" className="btn btn-light" type="submit" onClick={handleCreateGroup}>Create Group</button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateGroup;