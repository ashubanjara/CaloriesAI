const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const axios = require("axios");



const randomRecipe = async () => {
    try {
        apiKey = dotenv.parsed.SPOONTACULAR_API_KEY
        response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`)

        console.log(response)
    
        return response.data.recipes[0]
    }
    catch(e) {
        console.log(e)
    }
}

router.get("/random-recipe", async (req, res) => {

    const recipe = await randomRecipe()

    res.send({
        recipe
    });
});

module.exports = router;