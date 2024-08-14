import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "react-bootstrap";

import "../styles/joinGroup.css";


function JoinGroup({ joinGroup, currGroup, setShow, show, fetchUser, checkMembership }) {
    const { user } = useAuth0();


    // Close Modal
    function handleClose() {
        setShow(false);
    }

    // Handle Join Form Submit
    async function handleJoinSubmit(event) {
      event.preventDefault();
      const groupCode = document.getElementById("join-code-input").value;
      const joinCodeError = document.getElementById("join-code-error");

      try {
        await joinGroup(user, groupCode, currGroup.id);

        setShow(false);
        await fetchUser(user);
        await checkMembership(currGroup);
      } catch (error) {
        console.error(error);
      }
    }

    return (
        <div id="join-group-modal">
            <Modal show={show} onHide={handleClose} backdrop="static" style={{background: "transparent"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Join a Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="join-form">
                        <p>Enter Join Code</p>
                        <div id="join-code">
                            <input autoFocus id="join-code-input" type="text" placeholder="ABC1234"></input>
                            <button className="btn btn-dark" type="submit" onClick={handleJoinSubmit}>Join Group</button><br/>
                        </div><br/>
                        <div id="join-code-error" style={{display: 'none'}}>
                            <p>Incorrect Code</p>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default JoinGroup;