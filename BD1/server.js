

//Server instantiate
const express = require('express')
const app = express();

//used to parse req.body in express -> PUT or POST
const bodyParser = require('body-parser');

//specifically parse JSON data & add it to the request.Body object 
app.use(bodyParser.json());

//Activate the server on 3000 Port
app.listen(5000, () => {
    console.log("Server Started at Port no. 5000");
    
})

app.get('/', (req, res) => {
    res.send("Hello Jee Kaise Ho Saare")
})

app.post('/api/cars', (req,res) => {
    const {name,brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("Car Submitted Successfully")
    
})

const mongoose = require('mongoose');

//connect with database and create database
mongoose.connect('mongodb://localhost:27017/myDatabase', {
 
})

.then(() => {
    console.log("Connection Successfull");
})

.catch((error) => {
    console.log("Recieved an Error");
})