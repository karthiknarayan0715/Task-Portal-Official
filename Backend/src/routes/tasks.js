const taskRouter = require('express').Router();

const verifyAdmin = require('../middleware/verifyAdmin');
const Task = require("../models/schema/task")

taskRouter.get("/", async (req, res)=>{
    try{
        const tasks = await Task.find({})
        return res.status(200).json({tasks})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
})

// admin access for successive routes in this file
taskRouter.use(verifyAdmin);

taskRouter.post("/create", async (req, res)=>{
    try{
        const task = req.body;
        console.log(req.body)
  
        const new_task = await Task.create({
            name: task.name,
            description: task.description,
            state: "OPEN"
        })
        
        return res.status(200).json({message: "The task was created successfully!"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
})

taskRouter.put("/:id", async (req, res)=>{
    try{
        const updates = req.body;
        
        const task = await Task.findOne({"_id":req.params.id})
        if(task == null) return res.status(404).json({message: "Task not found"})
        task.name = updates.name != null ? updates.name : task.name;
        task.description = updates.description != null ? updates.description : task.description;
        await task.save();

        return res.status(200).json({message: "The task was updated successfully!"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
})

taskRouter.delete("/:id", async (req, res)=>{
    try{        
        const task = await Task.findOne({"_id":req.params.id})
        if(task == null) return res.status(404).json({message: "Task not found"})
        await Task.findOneAndDelete({"_id":req.params.id});
        return res.status(200).json({message: "The task was deleted successfully!"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
})

module.exports = taskRouter