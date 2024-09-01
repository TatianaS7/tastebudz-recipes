import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "react-bootstrap";

import "../styles/groupCard.css";
import axios from "axios";
import apiURL from "../api";

import JoinGroup from "./JoinGroup";
import GroupDetails from "./GroupDetails";


function GroupCard({ searchedGroups, joinGroup, myGroups, myGroupsView, setMyGroupsView, toggleMyGroups, setHomeView, homeView, fetchUser, refreshSaves, mySaves, setRefreshSaves, setMySavedRecipes, mySavesView, setMySavesView }) {
  const { user, isAuthenticated } = useAuth0();
  const [show, setShow] = useState(false);
  const [currGroup, setCurrGroup] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [expandGroupView, setExpandGroupView] = useState(false);
  const [membershipStatus, setMembershipStatus] = useState(false);

  // Toggle Join Group View
  async function toggleJoinGroup(group) {
    setCurrGroup(group);
    if (group.is_private) {
      setShow(true);
    } else {
      await joinGroup(user, null, group.id);
      await fetchUser(user);
      checkMembership(group);
    }
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

  // Leave Group
  async function leaveGroup(group) {
    try {
      // console.log(group.id);
      const res = await axios.put(`${apiURL}/groups/leave/${group.id}`, {
        email: user.email,
      });
      await fetchUser(user);
      checkMembership(group);
      setExpandGroupView(false);
    } catch (error) {
      console.log("Error leaving group:", error);
    }
  }

  // Handle View Group Click
  function viewGroup(group) {
    fetchGroup(group);
    setExpandGroupView(true);
  }

  // Check If User is in Group
  async function checkMembership(group) {
    try {
      const res = await axios.get(`${apiURL}/groups/${group.id}`);
      const data = res.data;
      const isMember = data.members.some(
        (member) => member.email === user.email
      );
      setMembershipStatus((prevState) => ({
        ...prevState,
        [group.id]: isMember,
      }));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchedGroups) {
      searchedGroups.forEach((group) => {
        checkMembership(group);
      });
    }
  }, [searchedGroups]);

  return (
    <>
      {show && (
        <JoinGroup
          joinGroup={joinGroup}
          currGroup={currGroup}
          setShow={setShow}
          show={show}
          toggleMyGroups={toggleMyGroups}
          setHomeView={setHomeView}
          homeView={homeView}
          fetchUser={fetchUser}
          checkMembership={checkMembership}
        />
      )}

      <div id={myGroupsView ? "my-group-results" : "group-results"}>
        {searchedGroups ? searchedGroups.map((group, index) => {
              return (
                <div key={index} className="group">
                  <h3>{group.name}</h3>
                  <p className="admin">Admin: {group.admin_email}</p>
                  <div className="join">
                    {isAuthenticated ? (
                      <>
                        {/* Check Membership */}
                        {membershipStatus[group.id] === undefined ? (
                          <p>Loading...</p>
                        ) : membershipStatus[group.id] ? (
                          <>
                            <button
                              id="viewGroup-btn"
                              className="btn btn-dark"
                              onClick={() => viewGroup(group)}
                            >
                              View Group
                            </button>
                            <p> Member</p>
                          </>
                        ) : (
                          <>
                            <button
                              id="joinGroup-btn"
                              className="btn btn-dark"
                              onClick={() => toggleJoinGroup(group)}
                            >
                              Join Group
                            </button>
                            <div className="group-type">
                              {group.is_private ? (
                                <p>Join Code Required</p>
                              ) : (
                                <p>Public Group</p>
                              )}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <p>Sign In to Join Group</p>
                    )}
                  </div>
                  {expandGroupView && (
                    <GroupDetails
                      groupData={groupData}
                      expandGroupView={expandGroupView}
                      setExpandGroupView={setExpandGroupView}
                      toggleMyGroups={toggleMyGroups}
                      fetchUser={fetchUser}
                      fetchGroup={fetchGroup}
                      leaveGroup={leaveGroup}
                      refreshSaves={refreshSaves} 
                      setRefreshSaves={setRefreshSaves} 
                      mySaves={mySaves} 
                      setMySavedRecipes={setMySavedRecipes} 
                      mySavesView={mySavesView} 
                      setMySavesView={setMySavesView}
                    />
                  )}
                </div>
              );
            })
          : myGroupsView &&
            myGroups &&
            myGroups.map((group, index) => {
              return (
                <>
                  <div key={index} className="group">
                    <h3>{group.name}</h3>
                    <p className="admin">Admin: {group.admin_email}</p>

                    <button
                      id="viewGroup-btn"
                      className="btn btn-dark"
                      onClick={() => viewGroup(group)}
                    >
                      View Group
                    </button>
                  </div>

                  {expandGroupView && (
                    <GroupDetails
                      groupData={groupData}
                      expandGroupView={expandGroupView}
                      setExpandGroupView={setExpandGroupView}
                      toggleMyGroups={toggleMyGroups}
                      fetchUser={fetchUser}
                      fetchGroup={fetchGroup}
                      leaveGroup={leaveGroup}
                      refreshSaves={refreshSaves} 
                      setRefreshSaves={setRefreshSaves} 
                      mySaves={mySaves} 
                      setMySavedRecipes={setMySavedRecipes} 
                      mySavesView={mySavesView} 
                      setMySavesView={setMySavesView}
                    />
                  )}
                </>
              );
            })}
      </div>
    </>
  );
}

export default GroupCard;