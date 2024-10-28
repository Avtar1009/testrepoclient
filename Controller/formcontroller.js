const express = require("express");
const Vehicle = require("../Model/formmodel.js");

const router = express.Router();

// POST route to create a new vehicle entry
router.post("/", async (req, res) => {
    const payload = req.body;

    try {
        const newVehicle = new Vehicle(payload);
        await newVehicle.save();
        res.status(200).json({ msg: "Vehicle created successfully", vehicle: payload });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET route to fetch all vehicles
router.get("/", async (req, res) => {
    try {
        const vehicles = await Vehicle.find().lean().exec();
        res.status(200).send(vehicles);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET route to fetch a vehicle by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const vehicle = await Vehicle.findById(id).lean().exec();
        if (!vehicle) {
            return res.status(404).send({ message: "Vehicle not found" });
        }
        res.status(200).send(vehicle);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET route to fetch vehicles based on adminname
router.get("/admin/:adminname", async (req, res) => {
    const { adminname } = req.params;
    console.log(adminname)
    try {
        // Find vehicles by admin name
        const vehicles = await Vehicle.find({ adminname }).lean().exec();

        // If no vehicles are found for the admin, send an appropriate message
        if (vehicles.length === 0) {
            return res.status(404).send({ message: "No vehicles found for this admin" });
        }

        // Return the vehicles associated with the admin
        res.status(200).send(vehicles);
    } catch (error) {
        res.status(500).send({ message: "Error fetching vehicles for admin", error: error.message });
    }
});

module.exports = router;
