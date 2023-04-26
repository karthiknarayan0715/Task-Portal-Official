const api = require('express').Router();

const Task = require("../models/schema/task")

api.get("/", async (req, res)=>{
    try{
        const task_id = req.body.task_id
        const task = await Task.findById(task_id)

        if(task)
            res.status(200).json({"task": task})
        else
            res.status(404).json({message: "The requested task was not found!"})
    }
    catch(err){
        console.log("Internal Server Error!")
    }
})
api.post("/create", async (req, res)=>{
    try{
        const task = req.body
        console.log(req.body)
        const new_task = await Task.create({
            name: task.name,
            desc: task.description,
            state: task.state
        })
        
        res.status(200).json({message: "The task was created successfully!"})
    }
    catch(err){
        console.log("Internal Server Error!")
        console.log(err)
    }
})

module.exports = api