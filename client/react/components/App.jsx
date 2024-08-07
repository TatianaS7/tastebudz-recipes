import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import axios from "axios";
import apiURL from "../api"

// Import Components
import Navbar from "./Navbar";
import Landing from "./Landing";

function App() {
    const { isAuthenticated, user } = useAuth0();

    return (
        <main>
            <Navbar />
            {!isAuthenticated && 
                <Landing />}
        </main>
    )
}

export default App;