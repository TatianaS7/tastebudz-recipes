import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "react-bootstrap";

import "../styles/groupCard.css";
import axios from "axios";
import apiURL from "../api";

import JoinGroup from "./JoinGroup";
import GroupDetails from "./GroupDetails";


function GroupCard({ searchedGroups, joinGroup, myGroups, myGroupsView, toggleMyGroups }) {
    const { user, isAuthenticated } = useAuth0();
    const [show, setShow] = useState(false);
    const [joinGroupView, setJoinGroupView] = useState(false);
    const [currGroup, setCurrGroup] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [expandGroupView, setExpandGroupView] = useState(false);


    // Toggle Join Group View
    function toggleJoinGroup(group) {
        setCurrGroup(group);
        {group.is_private ?
            setShow(true) 
        :
            joinGroup(user, null, group.id);
            setCurrGroup([]);
        }
        console.log(currGroup);
        console.log(joinGroupView);
    }    

    // Fetch Group Data
    async function fetchGroup(group) {
        try {
            const res = await axios.get(`${apiURL}/groups/${group.id}`);
            const data = res.data;
            setGroupData(data);
        } catch (error) {
            console.error(error);
        }
    }

    // Handle View Group Click
    function viewGroup(group) {
        fetchGroup(group);
        setExpandGroupView(true);
        console.log(groupData);
    }


    return (
        <>
        {show &&
            <JoinGroup joinGroup={joinGroup} currGroup={currGroup} setShow={setShow} show={show} />
        }

        <div id={myGroupsView ? "my-group-results" : "group-results"}>
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
            myGroupsView && myGroups && (myGroups.map((group, index) => {
                return (
                    <>  
                        <div key={index} className="group">
                            <h3>{group.name}</h3>
                            <p className="admin">Admin: {group.admin_email}</p>

                            <button id="viewGroup-btn" className="btn btn-dark" onClick={() => viewGroup(group)}>View Group</button>                    
                        </div>

                        {expandGroupView && groupData && (
                            <GroupDetails groupData={groupData} expandGroupView={expandGroupView} setExpandGroupView={setExpandGroupView} />
                        )}
                    </>
                );
            })    
        )}
    </div>
        
        </>
    )
}

export default GroupCard;