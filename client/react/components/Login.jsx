import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button id="login" className="btn btn-outline-dark btn-lg" onClick={() => loginWithRedirect()}>Get Started</button>;
};

export default LoginButton;