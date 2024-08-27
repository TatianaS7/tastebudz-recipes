import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Modal } from "react-bootstrap";

import "../styles/recipeDetails.css"
import { TimeOutline, PeopleOutline, EyeOutline } from 'react-ionicons'
import Saves from "./Saves";


function RecipeDetails({
  currRecipe,
  setCurrRecipe,
  showRecipe,
  setShowRecipe,
  viewType,
  recipe,
    toggleMySaves,
    mySaves,
    fetchUser,
    refreshSaves,
    setRefreshSaves
}) {
  const { isAuthenticated, user } = useAuth0();

  // Close Recipe Modal
  function closeModal() {
    setShowRecipe(false);
    // setCurrRecipe(null);
  }

  return (
    <>
      {currRecipe && showRecipe && (
        <Modal
          show={showRecipe}
          onHide={closeModal}
          size="lg"
          centered
          style={{ background: "none", height: "fit-content" }}
        >
          <Modal.Body>
            <div className="flex-div">
            <div className="img-name-div">
            {currRecipe.image &&
                <div className="recipe-image-div">
                     <img src={currRecipe.image} alt="recipe" />
                </div>
            }

                <div className="left-div">
                    <Modal.Title><h2>{currRecipe.name}</h2></Modal.Title>
                    <p className="details-user">Created by: {currRecipe.user}</p>

                    <div className="detail-stats">
                    {currRecipe.time && (
                        <div className="time">
                        <TimeOutline color={"#ad78de"} height="30px" width="30px" />{" "}
                        <p>{currRecipe.time} mins</p>
                        </div>
                    )}
                    {currRecipe.servings && (
                        <div className="servings">
                        <PeopleOutline color={"#ad78de"} height="30px" width="30px" />
                        <p>{currRecipe.servings} servings</p>
                        </div>
                    )}
                </div>
            </div>
            </div>

            <div className="details-right-side">
                { isAuthenticated && (viewType !== "myRecipes") && <Saves key={recipe.id} recipe={recipe} toggleMySaves={toggleMySaves} mySaves={mySaves} fetchUser={fetchUser} refreshSaves={refreshSaves} setRefreshSaves={setRefreshSaves}/>}
            </div>
            </div>

            <hr />


            <div className="body">
              <div className="ingredients">
                <h3>Ingredients</h3>
                <div className="scroll-div">
                  {currRecipe.ingredients.map((ingredient, idx) => (
                    <div className="recipe-ingredient" key={idx}>
                      <li>
                        {ingredient.quantity} {ingredient.ingredient}
                      </li>
                    </div>
                  ))}
                </div>
              </div>
              <div className="instructions">
                <h3>Instructions</h3>
                <div className="scroll-div">
                  <ol>
                    {currRecipe.instructions.map((instruction, idx) => (
                      <div className="recipe-instruction" key={idx}>
                        <li>{instruction}</li>
                      </div>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-dark" onClick={closeModal}>Close</button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default RecipeDetails;