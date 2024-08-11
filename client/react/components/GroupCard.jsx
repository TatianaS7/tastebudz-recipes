import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/groupCard.css";

import JoinGroup from "./JoinGroup";


function GroupCard({ searchedGroups, JoinGroupView, joinGroup, myGroups, myGroupsView }) {
    const { user, isAuthenticated } = useAuth0();
    const [show, setShow] = useState(false);
    const [joinGroupView, setJoinGroupView] = useState(false);
    const [currGroup, setCurrGroup] = useState([]);


    // Toggle Join Group View
    function toggleJoinGroup(group) {
        setCurrGroup(group);
        {group.is_private ?
            setShow(true) 
        :
            joinGroup(user, null, group.id);
        }
        console.log(currGroup);
        console.log(joinGroupView);
    }    

    // Fetch Group Data


    return (
        <>
        {setShow &&
            <JoinGroup joinGroup={joinGroup} currGroup={currGroup} setShow={setShow} show={show} myGroupsView={myGroupsView} />
        }

        <div id="group-results">
        {searchedGroups ? (
            searchedGroups.map((group, index) => {
            return (
                <div key={index} className="group">
                    <h3>{group.name}</h3>
                    <p className="admin">Admin: {group.admin_email}</p>
                        <div className="join">
                            {isAuthenticated ? (
                                <>
                                    <button id="joinGroup-btn" className="btn btn-dark" onClick={() => toggleJoinGroup(group)}>
                                        Join Group
                                    </button>
                                    <div className="group-type">
                                        {group.is_private ?
                                            <p>Join Code Required</p>
                                        :
                                            <p>Public Group</p>
                                        }
                                    </div>
                                </>
                            ) : (
                                <p>Sign In to Join Group</p>
                            )}
                        </div>
                </div>
            );
        })) : 
            myGroupsView && (myGroups.map((group, index) => {
                return (
                    <>
                        <div key={index} className="group">
                            <h3>{group.name}</h3>
                            <p className="admin">Admin: {group.admin_email}</p>

                            <button id="viewGroup-btn" className="btn btn-dark">View Group</button>                    
                        </div>
                    </>
                );
            })    
        )}
    </div>
        
        </>
    )
}

export default GroupCard;