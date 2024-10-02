const express = require("express");
const cors = require("cors");

const app = express(); // Provided all power to app

app.use(express.json());
app.use(cors()); // Enable CORS

const { connect } = require("./Server/db.js");
const formRouter = require("./Controller/formcontroller.js");
const uptRouter = require("./Controller/uptcontroller.js");

app.use("/feedback", formRouter);
app.use("/sendSms", uptRouter);

const port = 5000;
app.listen(port, async () => {
    try {
        await connect;
        console.log(`Port is running at ${port}`);
    } catch (error) {
        console.log(error.message);
    }
});
