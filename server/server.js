const express = require("express");
const cors = require("cors");

const imageCaloriesRouter = require("./routes/image-calories");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", imageCaloriesRouter);

app.listen(8080, () => {
    console.log("server listening on port 8080");
});
