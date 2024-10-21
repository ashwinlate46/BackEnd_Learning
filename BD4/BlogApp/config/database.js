const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{})

    .then(()=> console.log("DB Connection is Successfull"))
    .catch((error) => {
        console.log("Issue in DB Connection");
        console.log(error.message);
        
        process.exit(1);
    })
}

module.exports = dbConnect;