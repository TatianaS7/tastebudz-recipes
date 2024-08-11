import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "react-bootstrap";

import "../styles/joinGroup.css";


function JoinGroup({ userData, setSearchView, JoinGroupView, setMyGroupsView }) {
    const { user } = useAuth0();
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, [JoinGroupView]);

    // Close Modal
    function handleClose() {
        setShow(false);
        setMyGroupsView(true);
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Join a Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="join-form">
                        <p>Have a Join Code? Enter it here!</p>
                        <div id="join-code">
                            <input id="join-code-input" type="text" placeholder="ABC1234"></input>
                            <button className="btn btn-dark" type="submit">Join Group</button><br/>
                        </div><br/>

                        <div id="browse-groups">
                            <p>Not sure?</p>
                            <button className="btn btn-outline-dark" onClick={() => setSearchView(true)}>Browse Groups</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default JoinGroup;