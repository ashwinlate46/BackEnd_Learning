const express  = require('express');

const app = express();

const port = 3000;

//adding middleware
app.use(express.json());

//get request
app.get("/", (req,res) => {
    res.send(`<h1>This is Ashwin</h1>`)
})

//post request

app.post("/mobile", (req,res) => {
    res.send("This is Post Request")
})

app.listen(port, () => {
    console.log("App Started");
});