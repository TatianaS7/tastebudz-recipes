import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "react-bootstrap";

import "../styles/groupDetails.css";
import { SearchOutline } from 'react-ionicons'

import axios from "axios";
import apiURL from "../api";

import RecipeCardWrapper from "./RecipeCardWrapper";

function GroupDetails({ groupData, expandGroupView, setExpandGroupView, toggleMyGroups, fetchUser, fetchGroup, leaveGroup, refreshSaves, setRefreshSaves, mySavedRecipes, setMySavedRecipes, mySavesView, setMySavesView }) {
  const { user } = useAuth0();
  const [showDetails, setShowDetails] = useState(false);


  // Toggle Group Details
  function toggleDetails() {
    if (expandGroupView) {
      setShowDetails(!showDetails);
    }
  }

  // Close Group Details
  function closeDetails() {
    setExpandGroupView(false);
  }

  // Handle Leave Group Click
  async function handleLeaveGroupClick() {
    await leaveGroup(groupData);
    closeDetails();
    await fetchUser(user);
  }


  return (
      <Modal id="group-details-div" show={toggleDetails} onHide={closeDetails} size="xl" centered style={{background: "none", height: 'fit-content'}}>
        <Modal.Header>
          <div className="left-div">
            <h4>Group Details</h4>
          </div>
          <div className="actions">
            {groupData.admin_email === user.email ? (
              <div style={{display: "flex", gap: '1em'}}>
                <button className="btn btn-dark">Edit Group</button>
                <button className="btn btn-danger">Delete Group</button>
              </div>
            ) : (
              <button className="btn btn-outline-danger" onClick={handleLeaveGroupClick}>Leave Group</button>
            )}
          </div>
        </Modal.Header>
        <Modal.Body style={{padding: '3em'}}>
            <div className="group-header">
                <div>
                    <p><b>Group:</b></p>
                    <h2>{groupData.name}</h2>
                </div>
                <div>
                    <p><b>Admin: </b>{groupData.admin_email}</p>
                    <p><b>Privacy: </b>{groupData.is_private === true ? 'Private Group' : 'Public Group'}</p>
                    <p><b>Members: </b>{groupData.members && groupData.members.length}</p>
                </div>
            </div>
          <hr/>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <h4>Recipes</h4>

                <div className="search-recipes">
                        <input id="search-group-recipes" type="text" placeholder="Search Recipes.." />
                        <button id="search-group-btn"><SearchOutline color={'#ae61e6'} height="30px" width="30px" /></button>
                </div>
          </div>
                
                <div className="group-recipes">
                    {groupData && Array.isArray(groupData.recipes) && groupData.recipes.length > 0 ? (
                      <RecipeCardWrapper fetchUser={fetchUser} groupRecipes={groupData.recipes} expandGroupView={expandGroupView} refreshSaves={refreshSaves} setRefreshSaves={setRefreshSaves} mySaves={mySavedRecipes} setMySavedRecipes={setMySavedRecipes} mySavesView={mySavesView} setMySavesView={setMySavesView} showDetails={showDetails}/>
                    ) : groupData && Array.isArray(groupData.recipes) && groupData.recipes.length === 0 ? (
                            <p>No Recipes Added!</p>
                    ) : null }
                </div>
        </Modal.Body>
        <Modal.Footer style={{justifyContent: 'space-between'}}>
            <button id="add-recipe-btn" className="btn btn-dark">Add a Recipe</button>
            <button className="btn btn-dark" onClick={closeDetails}>Close</button>
        </Modal.Footer>
      </Modal>
  );
}

export default GroupDetails;
