const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});

//post middleware
fileSchema.post("save", async function (doc) {
    try{
        console.log("DOC", doc)

        //transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: 465, // or 587 if using STARTTLS
            secure: true, // true for 465, false for 587
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        //send email
        let info = await transporter.sendMail({
            from:`CodeHelp - by Ashwin`,
            to:doc.email,
            subject:"New File Upload on Cloudinary",
            html:`<h2>Hello Jee</h2> <p>File Uploaded View Here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`,
        })

        console.log("INFO", info);

    }
    catch(error){
            console.error(error);
    }
})

const File = mongoose.model("File", fileSchema);
module.exports = File;