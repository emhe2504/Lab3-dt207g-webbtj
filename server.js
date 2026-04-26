
//Importera paket
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

//Express-instans
const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());


//Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Lab3dt207g").then(() => {
    console.log("Successfully connected to MongoDB");
}).catch((error) => {
    console.log("Could not connect to database du to: " + error);
})

//Routes
app.get("/"), async (req, res) => {

}



app.listen(port, () => {
    console.log("Server is started at port: " + port)
})