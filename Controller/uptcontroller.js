const express = require("express");
const Upt = require("../Model/upt.js");

const api = express.Router();

api.post("/", async (req, res) => {
    const payload = req.body;
    try {
        const newUpt = new Upt(payload);
        await newUpt.save();
        res.status(200).json({ msg: "Successful Todo created", todo: payload });
    } catch (error) {
        res.status(400).send(error.message);

        console.log(error)
    }
});

api.get("/", async (req, res) => {
    try {
        const todo = await Upt.find().lean().exec();
        res.status(200).send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
});


// delete the todo by id 
api.delete("/:id", async(req,res)=>{
    const deleteID =req.params.id;
    try {

        const deleteTodo =await Upt.findByIdAndDelete(deleteID)
        res.status(201).json({msg:"Todo Deleted successfully ",todo:deleteTodo})
    } catch (error) {
        res.status(400).send(error)
        
    }
})

module.exports = api; // Export only the api directly
