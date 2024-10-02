const express =require("express");
// const { Vehicle } = require("../Model/formmodel.js");
const Vehicle=require("../Model/formmodel.js")

const router = express.Router();



router.post("/",async(req,res)=>{
    const payload = req.body;

    try {
    
        const newTodo  = new Vehicle(payload);
        await newTodo.save();
        res.status(200).json({msg:"Successful Todo created",todo:payload})

    } catch (error) {
        res.status(400).send(error.message)
    }
})


router.get("/",async(req,res)=>{
    try {

        const todo = await Vehicle.find().lean().exec();
        res.status(200).send(todo)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

// router.get("/:id" ,async (req,res)=>{
//     try {
//         const product  = await Product .findById(req.params.id).lean().exec();
//         res.send(product)
        
//     } catch (err) {
//        return res.status(500).send(err.message)
//     }
// })



router.get("/:id", async (req, res) => {

    const { id } = req.params;

    console.log(id)
    try {
        const vehicle = await Vehicle.findById(req.params.id).lean().exec();
        if (!vehicle) {
            return res.status(404).send({ message: "Vehicle not found" });
        }
        res.status(200).send(vehicle);
    } catch (error) {
        res.status(500).send(error.message);
    }
});




// delete the todo by id 
// router.delete("/:id", async(req,res)=>{
//     const deleteID =req.params.id;
//     try {

//         const deleteTodo =await TodoModel.findByIdAndDelete(deleteID)
//         res.status(201).json({msg:"Todo Deleted successfully ",todo:deleteTodo})
//     } catch (error) {
//         res.status(400).send(error)
//     }
// })

//  Now the time for update 


module.exports=router