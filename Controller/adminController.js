const express = require("express");
const Admin = require("../Model/adminmodel.js");

const adminapi = express.Router(); // Corrected from express.router() to express.Router()

// POST route to create a new admin
adminapi.post("/", async (req, res) => {
  try {
    // Extract name and password from request body
    const { name, password } = req.body;

    // Check if both fields are present
    if (!name || !password) {
      return res.status(400).json({ message: "Name and password are required" });
    }

    // Check if admin already exists (to prevent duplicates)
    const existingAdmin = await Admin.findOne({ name });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this name already exists" });
    }

    // Create a new admin
    const newAdmin = new Admin({
      name,
      password,
    });

    // Save the new admin to the database
    await newAdmin.save();

    // Respond with success
    res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "An error occurred while creating the admin", error: error.message });
  }
});


adminapi.get("/",async(req,res)=>{
  try {
    const adminData =await Admin.find().lean().exec();
    res.status(200).send(adminData);
    
  } catch (error) {
    res.status(400).send(error);
  }
})

// here is the code for update the user 

adminapi.put("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get admin ID from the request parameters
    const { name, password } = req.body; // Get new name and password from the request body

    // Validate that both fields are present
    if (!name || !password) {
      return res.status(400).json({ message: "Name and password are required" });
    }

    // Find the admin by ID
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Check if the name already exists (to avoid duplicates)
    const existingAdmin = await Admin.findOne({ name });
    if (existingAdmin && existingAdmin._id.toString() !== id) {
      return res.status(400).json({ message: "An admin with this name already exists" });
    }

    // Update the admin's name and password
    admin.name = name;
    admin.password = password;

    // Save the updated admin details
    await admin.save();

    // Respond with success
    res.status(200).json({ message: "Admin updated successfully", admin });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: "An error occurred while updating the admin", error: error.message });
  }
});

// Here is the code for Delete the user by ID 

// DELETE route to remove an admin by ID
adminapi.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the admin ID from request parameters

    // Find the admin by ID and remove them
    const deletedAdmin = await Admin.findByIdAndDelete(id);

    // If no admin was found with the given ID, return a 404 error
    if (!deletedAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Respond with success and the details of the deleted admin
    res.status(200).json({ message: "Admin deleted successfully", admin: deletedAdmin });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "An error occurred while deleting the admin", error: error.message });
  }
});


module.exports = adminapi;
