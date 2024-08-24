const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const axios = require("axios");



const randomRecipe = async (numRecipies, topThreeTags) => {
    try {
        console.log(numRecipies)
        apiKey = dotenv.parsed.SPOONTACULAR_API_KEY
        response = await axios.get(topThreeTags ? `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${numRecipies}&include-tags=${topThreeTags}` : `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${numRecipies}`)
        console.log(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${numRecipies}&include-tags=${topThreeTags}`)
        return response.data.recipes
    }
    catch(e) {
        console.log(e)
    }
}

router.get("/random-recipe", async (req, res) => {
    
    let numRecipies = req.query.number

    let topThreeTags = req.query.tags

    const recipes = await randomRecipe(numRecipies, topThreeTags)

    res.send({
        recipes
    });
});

module.exports = router;