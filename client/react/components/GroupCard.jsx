import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/groupCard.css";


function GroupCard({ searchedGroups }) {
    const { user, isAuthenticated } = useAuth0();

    return (
        <div id="group-results">
        {searchedGroups.map((group, index) => {
            return (
                <div key={index} className="group">
                    <h3>{group.name}</h3>
                    <p className="user">Admin: {group.admin}</p>
                        <div className="join">
                            {isAuthenticated ? 
                                <button id="joinGroup-btn" className="btn btn-outline-dark">Join Group</button>
                                :
                                <p>Sign In to Join Group</p>
                            }
                        </div>
                </div>
            );
        })}
    </div>
    )
}

export default GroupCard;