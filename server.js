
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
mongoose.connect(process.env.MONGO_URI).then(() => {
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
        return res.status(500).json({ message: "Could not find works" });
    }
});

app.get("/works/:id", async (req, res) => {
    try {

        const ID = req.params.id;

        let result = await Work.findById(ID);      //Hitta spcifikt arbete utefter id
        if (!result) { return res.status(500).json({ message: "Kunde inte hitta work med matchande ID" }) }
        return res.json(result);

    } catch (error) {
        return res.status(500).json({ message: "Could not find work" });
    }
});

app.post("/works", async (req, res) => {

    try {
        let result = await Work.create(req.body);   //Skapa arbete utefter req.body
        return res.json(result);

    } catch (error) {

        //Validering (utefter required i Schema)

        if (error.name === "ValidationError") {      //Om valideringsfel

            const errorArray = [];

            Object.values(error.errors).forEach(err => {
                errorArray.push(err.message);
            })

            return res.status(400).json({ message: errorArray });

        }

        return res.status(400).json(error);
    }
});

app.put("/works/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const newData = req.body;

        //Där id = req.params.id, sätt in den nya req.body (true på validering - required)
        let result = await Work.updateOne({ _id: id }, { $set: newData }, { runValidators: true });
        return res.json(result);

    } catch (error) {

        //Samma validering som i post

        if (error.name === "ValidationError") {      //Om valideringsfel

            const errorArray = [];

            Object.values(error.errors).forEach(err => {
                errorArray.push(err.message);
            })

            return res.status(400).json({ message: errorArray });

        }

        return res.status(400).json(error);
    }
})

app.delete("/works/:id", async (req, res) => {
    try {
        const id = req.params.id;
        let result = await Work.deleteOne({ _id: id });     //Radera work där id = req.params.id

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Kunde inte radera work, inget matchande id" });    //om inget raderades
        }

        return res.json({ message: "Work med id: " + req.params.id + " raderad" });    //om radering lyckats

    } catch (error) {
        return res.status(500).json(error);
    }
})


app.listen(port, () => {
    console.log("Server is started at port: " + port)
})