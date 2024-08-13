import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "react-bootstrap";

import "../styles/groupDetails.css";
import { SearchOutline } from 'react-ionicons'

import axios from "axios";
import apiURL from "../api";

import RecipeCard from "./RecipeCard";

function GroupDetails({ groupData, expandGroupView, setExpandGroupView }) {
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


  return (
      <Modal show={toggleDetails} onHide={closeDetails} size="xl" centered style={{background: "none", height: 'fit-content'}}>
        <Modal.Header>
          <div className="left-div">
            <h4>Group Details</h4>
          </div>
          <div className="actions">
            {groupData.admin_email === user.email ? (
              <div style={{display: "flex", gap: '1em'}}>
                <button className="btn btn-dark">Edit Group</button>
                <button className="btn btn-dark">Delete Group</button>
              </div>
            ) : (
              <button className="btn btn-dark">Leave Group</button>
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
                    {groupData ? (
                        <RecipeCard groupRecipes={groupData.recipes} expandGroupView={expandGroupView}/>
                    ) : (
                        <>
                            <p>No Recipes Added!</p>
                        </>
                    )}
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
