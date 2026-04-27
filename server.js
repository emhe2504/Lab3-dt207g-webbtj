
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

//Works Schema
const worksSchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: [true, "Ange företagsnamn"]
    },
    jobtitle: {
        type: String,
        required: [true, "Ange arbetstitel"]
    },
    location: {
        type: String,
        required: [true, "Ange företagets plats"]
    },
    startdate: {
        type: Date,
        required: [true, "Ange startdatum"]
    },
    enddate: {
        type: Date,
        required: [true, "Ange slutdatum"]
    },
    description: {
        type: String,
        required: [true, "Ange beskrivning"]
    }
});

//Inkludera Schema till databas
const Work = mongoose.model("Work", worksSchema);


//Routes
app.get("/works", async (req, res) => {
    try {
        let result = await Work.find({});

        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.post("/works", async (req, res) => {

    try {
        let result = await Work.create(req.body);
        return res.json(result);

    } catch (error) {
        return res.status(400).json(error);
    }
});

app.put("/works/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        let result = await Work.updateOne({ _id: id }, { $set: newData });

        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
})


app.listen(port, () => {
    console.log("Server is started at port: " + port)
})