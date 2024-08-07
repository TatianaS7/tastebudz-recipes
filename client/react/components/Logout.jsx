import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { LogOutOutline } from 'react-ionicons'
import "../styles/navbar.css";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button id="logout" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <LogOutOutline color={'#00000'} height="35px" width="35px"/>    
    </button>
  );
};

export default LogoutButton;