import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "react-bootstrap";

import "../styles/joinGroup.css";


function JoinGroup({ setSearchView, joinGroup, currGroup, setShow, show, setMyGroupsView, toggleMyGroups, setHomeView }) {
    const { user } = useAuth0();


    // Close Modal
    function handleClose() {
        setShow(false);
    }

    // Handle Join Form Submit
    function handleJoinSubmit(event) {
        event.preventDefault();
        const groupCode = document.getElementById("join-code-input").value;
        joinGroup(user, groupCode, currGroup.id);
        setShow(false);
        // setHomeView(true);
        // setMyGroupsView(true);
        // toggleMyGroups();
    }

    return (
        <div id="join-group-modal">
            <Modal show={show} onHide={handleClose} backdrop="static" style={{background: "transparent"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Join a Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="join-form">
                        <p>Have a Join Code? Enter it here!</p>
                        <div id="join-code">
                            <input autoFocus id="join-code-input" type="text" placeholder="ABC1234"></input>
                            <button className="btn btn-dark" type="submit" onClick={handleJoinSubmit}>Join Group</button><br/>
                        </div><br/>

                        <div id="browse-groups">
                            <p>Not sure?</p>
                            <button className="btn btn-outline-dark" onClick={() => setSearchView(true)}>Browse Groups</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default JoinGroup;