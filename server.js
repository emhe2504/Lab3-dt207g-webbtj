
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
        let result = await Work.find({}); //Hitta alla arbeten

        return res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Kunde inte hitta works" });
    }
});

app.get("/works/:id", async (req, res) => {
    try {

        const ID = req.params.id;

        let result = await Work.find({ _id: ID });      //Hitta spcifikt arbete utefter id

        return res.json(result);

    } catch (error) {
        return res.status(500).json( {message: "Kunde inte hitta work" });
    }
});

app.post("/works", async (req, res) => {

    //returnera array med felmeddelanden om något missats

    const errors = [];
    if (!req.body.companyname) { errors.push(`Lägg till företagsnamn`); }
    if (!req.body.jobtitle) { errors.push(`Lägg till arbetstitel`); }
    if (!req.body.location) { errors.push(`Lägg till arbetets plats`); }
    if (!req.body.startdate) { errors.push(`Lägg till startdatum`); }
    if (!req.body.enddate) { errors.push(`Lägg till slutdatum`); }
    if (!req.body.description) { errors.push(`Lägg till beskrivning`); }

    if (errors.length > 0) {
        return res.status(400).json({ message: errors });
    }

    try {
        let result = await Work.create(req.body);   //Skapa arbete från req.body
        return res.json(result);

    } catch (error) {
        return res.status(400).json(error);
    }
});

app.put("/works/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const newData = req.body;
        let result = await Work.updateOne({ _id: id }, { $set: newData });  //Där id = req.params.id, sätt in den nya req.body

        return res.json(result);
    } catch (error) {
        return res.status(500).json(error);
    }
})

app.delete("/works/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let result = await Work.deleteOne({ _id: id });     //Radera en där id = req.params.id

        return res.json(result);
    } catch(error) {
        return res.status(500).json(error);
    }
})


app.listen(port, () => {
    console.log("Server is started at port: " + port)
})