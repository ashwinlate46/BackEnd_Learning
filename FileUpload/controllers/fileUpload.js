const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

//localFileUpload -> Handler Function
exports.localFileUpload = async (req,res) => {
    try{
        //fetch file from request
        const file = req.files.file;
        console.log("File Aagayi JEE -> ",file);

        //create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH -> ",path)

        //add path to the move function
        file.mv(path, (err) => {
            console.log(err);
        });

        //create a successful response
        res.json({
            success:true,
            message:'Local File Uploaded Successfully',
        });
    }
    catch(error){
        console.log("Not able to Upload the file on Server")
        console.log(error);
    }
}

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folderName, quality) {
    const options = {folder: folderName};
    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    console.log("temp file path", file.tempFilePath);

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
//image upload handler

exports.imageUpload = async (req,res) => {

    try{
        // Check if the file was uploaded properly
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded",
            });
        }   

        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("FileType : ",fileType);

        //File Format Supported nahi hai
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        //File format supported hai
        console.log("Uploading to AshwinFiles");
        const response = await uploadFileToCloudinary(file,"AshwinFiles");
        console.log(response);

        //db me entry save karni hai

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully Uploaded",
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong",
        })
    }
}

//video upload handler

exports.videoUpload = async (req,res) => {
    try{
        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        // console.log(file);

        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("FileType : ",fileType);
    
        //File Format Supported nahi hai
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        //File Format Supported hai
        console.log("Uploading to AshwinFiles");
        const response = await uploadFileToCloudinary(file,"AshwinFiles");
        console.log(response);

        //db me entry save karni hai

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Video Successfully Uploaded",
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong",
        })
    }
}

exports.imageSizeReducer = async (req,res) => {

    try{
        // Check if the file was uploaded properly
        if (!req.files || !req.files.imageFile) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded",
            });
        }   

        //data fetch
        const {name, tags, email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split('.').pop().toLowerCase();
        console.log("FileType : ",fileType);

        //File Format Supported nahi hai
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:"File format not supported",
            })
        }

        //File format supported hai
        console.log("Uploading to AshwinFiles");
        const response = await uploadFileToCloudinary(file,"AshwinFiles", 90);
        console.log(response);

        //db me entry save karni hai

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully Resized",
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            success:false,
            message:"Something Went Wrong",
        })
    }
}