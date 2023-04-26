const getAppData = require('../middleware/getAppData');

const authRouter = require('express').Router();

authRouter.post("/login", getAppData, async (req, res)=>{
    try{
        // yet to make api call to get access code and api call to fetch user data and store in db
        return res.status(200).json({message: "Login Successfull"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
})

module.exports = authRouter