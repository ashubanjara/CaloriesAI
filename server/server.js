const express = require("express");
const cors = require("cors");

const imageCaloriesRouter = require("./routes/image-calories");
const dishRecommenderRouter = require("./routes/dish-recommender");
const auth = require("./routes/auth");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", imageCaloriesRouter);
app.use("/", dishRecommenderRouter);
app.use("/", auth);

app.listen(8080, () => {
    console.log("server listening on port 8080");
});
