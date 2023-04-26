const userTaskRouter = require('express').Router();

const Task = require("../models/schema/task")
const Employee = require("../models/schema/employee")

userTaskRouter.get("/assignedTasks", async (req, res)=>{
    try{
        let user = await Employee.findOne({email : req.jwt_payload.email}).populate("tasks");
        
        if(user == null) return res.status(404).json({message: "User not found"})
        let tasks = user.tasks
        return res.status(200).json({tasks})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
})

userTaskRouter.put("/assign/:id", async (req, res)=>{
    try{
        let user = await Employee.findOne({email : req.jwt_payload.email});
        if(user == null) return res.status(404).json({message: "User not found"})
        let task = await Task.findOne({"_id":req.params.id})
        if(task == null) return res.status(404).json({message: "Task not found"})
        
        if(task.state!="OPEN") return res.status(405).json({message: "Task already taken"});
        user.tasks.push(task._id);
        await user.save();

        task.state = "ASSIGNED";
        await task.save();

        return res.status(200).json({message: "The task was assigned successfully!"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
})

userTaskRouter.put("/done/:id", async (req, res)=>{
    try{
        let user = await Employee.findOne({email : req.jwt_payload.email});
        if(user == null) return res.status(404).json({message: "User not found"})
        let task = await Task.findOne({"_id":req.params.id})
        if(task == null) return res.status(404).json({message: "Task not found"})
        
        if(!user.tasks.includes(task._id)) return res.status(405).json({message: "Task not assigned"});
        if(task.state!="ASSIGNED") return res.status(405).json({message: "Task already done"});
        task.state = "DONE";
        await task.save();

        return res.status(200).json({message: "The task state updated successfully!"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
})


module.exports = userTaskRouter