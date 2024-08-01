const express = require("express");
const router = express.Router();
const dotenv = require("dotenv").config();
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const OpenAI = require("openai");

const openai = new OpenAI(dotenv.parsed.OPENAI_API_KEY);

const { HfInference } = require("@huggingface/inference");

const inference = new HfInference(dotenv.parsed.HF_API_TOKEN);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "../server/public/images"),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

const upload = multer({ storage: storage });

const getImageDescription = async (imagePath) => {
    const imageBuffer = fs.readFileSync(imagePath);

    const result = await inference.imageToText({
        data: imageBuffer,
        model: "Salesforce/blip-image-captioning-large",
    });

    return result;
};

const descriptionToJSON = async (description) => {
    const messages = [
        {
            role: "system",
            content:
                `You are an expert at converting image descriptions of food to JSON data in 
                the format {foodName, foodCount, isFood}, return only the JSON in an array, with no other 
                formatting`,
        },
        {
            role: "user",
            content: description,
        },
    ];
    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-4o-mini",
    });

    return completion
};

const getCalories = async (foodData) => {
    const foodCalories = []
    await Promise.all(foodData.map(async food => {
        const response = await axios.get(`https://api.calorieninjas.com/v1/nutrition/?query=${food.foodName}`, {
            headers: {
              'X-Api-Key': dotenv.parsed.CALORIENINJAS_API_KEY
            }
        })
        if(response.data.items.length > 0) {
            foodCalories.push({
                food: {
                    displayName: 'Food',
                    value: food.foodName
                },
                foodCount: {
                    displayName: 'Food Count',
                    value: food.foodCount
                }, 
                foodCalories: {
                    displayName: 'Total Calories',
                    value: response.data.items[0].calories*food.foodCount
                },
                carbohydrates: {
                    displayName: "Carbohydrates (g)",
                    value: response.data.items[0].carbohydrates_total_g*food.foodCount
                },
                protein: {
                    displayName: "Protein (g)",
                    value: response.data.items[0].protein_g*food.foodCount
                },
                fats: {
                    displayName: "Fats (g)",
                    value: response.data.items[0].fat_total_g*food.foodCount
                }
            })
        }
        console.log(response.data)
    }))
    console.log(foodCalories)
    return foodCalories
}

router.post("/image-calories", upload.single("file"), async (req, res) => {
    const imageDescriptionData = await getImageDescription(req.file.path);
    const foodJSONStr = await descriptionToJSON(imageDescriptionData.generated_text);
    console.log(foodJSONStr.choices[0].message.content)
    const calories = await getCalories(JSON.parse(foodJSONStr.choices[0].message.content))
    console.log(calories)
    res.send({
        description: imageDescriptionData.generated_text,
        calories: calories
    });
    fs.unlinkSync(req.file.path);
});

router.post("/text-calories", async (req, res) => {
    console.log(req.body)
    const foodJSONStr = await descriptionToJSON(req.body.textPrompt);
    console.log(foodJSONStr.choices[0].message.content)
    const calories = await getCalories(JSON.parse(foodJSONStr.choices[0].message.content))
    console.log(calories)
    res.send({
        description: req.body.textPrompt,
        calories: calories
    });
});

module.exports = router;
