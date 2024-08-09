import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/home.css";


function Home() {
    const { user } = useAuth0();

    console.log(user);

    return (
        <section>
            <h4>Welcome Back, {user.given_name}!</h4>

            <div className="flex-container">
                <div className="action-buttons">
                    <button id="create-recipe">Create Recipe</button><hr/>
                    <button id="create-group">Create Group</button>
                    <button id="join-group">Join Group</button>
                    <hr/>
                    <button id="my-recipes">My Recipes</button>
                    <button id="my-groups">My Groups</button>
                </div>

                <div className="feed">
                
                </div>
            </div>
        </section>
    )
}

export default Home;