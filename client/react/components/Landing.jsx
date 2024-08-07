import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "../styles/landing.css";
import { ListCircleOutline } from 'react-ionicons'

import LoginButton from "./Login";


function Landing() {
    const { isAuthenticated, user } = useAuth0();

    return (
        <section>
            <div className="flex">
                <div id="landing-header">
                    <h1>Savory, Tasty <br/><span>Recipes</span></h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident consectetur iste iusto, aliquid excepturi, saepe asperiores quo ipsam ullam sint similique sapiente reprehenderit maiores voluptates delectus voluptate placeat reiciendis a!</p><br/>
                    <LoginButton />
                </div>

                <div id="landing-image">
                    <ListCircleOutline color={'#b6a6c5'} height="370px" width="370px"/>
                </div>
            </div><hr/><br/>

            <h3>Categories</h3>
            <div id="categories">
                <div className="category">
                    <img src="https://simply-delicious-food.com/wp-content/uploads/2022/09/Breakfast-board28.jpg" alt="Breakfast" />
                    <p>Breakfast</p>
                </div>
                <div className="category">
                    <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/01/Vegan-foods-8c73cd6.jpg?quality=90&resize=440,400" alt="Vegan" />
                    <p>Vegan</p>
                </div>
                <div className="category">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Desserts.jpg/640px-Desserts.jpg" alt="Dessert" />
                    <p>Dessert</p>
                </div>
                <div className="category">
                    <img src="https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg" alt="Pasta" />
                    <p>Pasta</p>
                </div>
                <div className="category">
                    <img src="https://i.pinimg.com/originals/93/08/19/93081945cca7fbe8606c3770f07b9128.jpg" alt="Fish" />
                    <p>Fish</p>
                </div>
                <div className="category">
                    <img src="https://cdn.loveandlemons.com/wp-content/uploads/2019/12/potato-soup-recipe-scaled.jpg" alt="Soup" />
                    <p>Soup</p>
                </div>
            </div><br/>

            <hr/><br/>

            <h3>Popular Recipes</h3>
            <div id="popular-recipes">
                <div className="recipe">
                    <div className="header">
                        <img src="https://images.themodernproper.com/billowy-turkey/production/posts/2019/Chicken-Picatta-8.jpg?w=960&h=960&q=82&fm=jpg&fit=crop&dm=1689343305&s=e1685f4f465c7e357d48a95759855dea" alt="Placeholder" />
                        <p className="user">Created by: @monicaluvx3</p>
                    </div>
                    <h4>Chicken Picatta</h4>
                    <p className="ingredients">Lemon, Capers, Chicken, White Wine</p>
                    <div className="footer tags">
                        <p>#chicken</p>
                        <p>#dinner</p>
                    </div>
                </div>
                <div className="recipe">
                    <div className="header">
                        <img src="https://www.3yummytummies.com/wp-content/uploads/2020/06/Watermelon-Salad-with-Feta-and-Mint-801x1024.jpg" alt="Placeholder" />
                        <p className="user">Created by: @hayley333</p>
                    </div>
                    <h4>Watermelon Feta Salad</h4>
                    <p className="ingredients">Watermelon, Feta Cheese</p>
                    <div className="footer tags">
                        <p>#vegan</p>
                        <p>#light</p>
                        <p>#lunch</p>
                    </div>
                </div>
                <div className="recipe">
                    <div className="header">
                        <img src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/avocado-on-toast-96e3158.jpg" alt="Placeholder" />
                        <p className="user">Created by: @mike_griffin</p>
                    </div>
                    <h4>Avocado Toast</h4>
                    <p className="ingredients">Sourdough, Red Pepper Flakes, Avocado, Salt, Pepper</p>
                    <div className="footer tags">
                        <p>#chicken</p>
                        <p>#dinner</p>
                    </div>
                </div>
            </div>
        </section>
        
    )
}

export default Landing;