const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5000;

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(express.json());

const {connectDB } = require("./config/database");
connectDB ();

//route import and mount

const user = require("./routes/user");
const { log } = require("console");
app.use("/api/v1",user);

//activate

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})