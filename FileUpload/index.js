//app create
const express = require("express");
const app = express();

//Port Find Karna hai
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware add karna hai
app.use(express.json());

const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//DB se Connect Karna hai
const {connectDB } = require("./config/database");
connectDB ();

//Cloud se Connect Karna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount karna hai
const Upload = require("./routes/FileUpload");
app.use('/api/v1/upload', Upload);

//activate server
app.listen(PORT, () => {
    console.log(`App is Running at ${PORT}`);
})


