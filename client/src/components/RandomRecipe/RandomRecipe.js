import React, { useState } from "react";
import axios from "axios";
import "./RandomRecipe.css"

export default function RandomRecipe() {

    const [recipe, setRecipe] = useState({})

    const getRandomRecipe = async () => {
        try {
            const res = await axios.get("http://localhost:8080/random-recipe")
            setRecipe(res.data.recipe)
        }
        catch(e) {
            console.log(e)
        }
    }

    console.log(recipe.title)

    const renderIngredients = (ingredients) => {
        console.log(ingredients)
        return (
            <ul className="ingredients-list">
                {ingredients.map(ingredient => {
                    return <li>{ingredient.original}</li>
                })}
            </ul>
        )
    }

    const renderSteps = (steps) => {
        return (
            <ol className="steps-list">
                {steps.map(step => {
                    return <li>{step.step}</li>
                })}
            </ol>
        )
    }

    return (
        <>
            <button onClick={getRandomRecipe}>Get Random Recipe</button>
            {Object.keys(recipe).length > 0 && <div className="random-recipe-container">
                <img src={recipe.image} alt={recipe.title}/>
                <h3>{recipe.title}</h3>
                <h4>Time To Cook: {recipe.readyInMinutes} Minutes</h4>
                <div className="lists-container">
                    {renderIngredients(recipe.extendedIngredients)}
                    {renderSteps(recipe.analyzedInstructions[0].steps)}
                </div>
            </div>
            }
        </>
    )
}