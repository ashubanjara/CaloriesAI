const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const axios = require("axios");



const randomRecipe = async (numRecipies) => {
    try {
        console.log(numRecipies)
        apiKey = dotenv.parsed.SPOONTACULAR_API_KEY
        response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${numRecipies}`)
    
        return response.data.recipes
    }
    catch(e) {
        console.log(e)
    }
}

router.get("/random-recipe", async (req, res) => {
    
    let numRecipies = req.query.number

    const recipes = await randomRecipe(numRecipies)

    res.send({
        recipes
    });
});

module.exports = router;