const getAppData = require('../middleware/getAppData');
const { createJWT } = require('../middleware/jwt');
const axios = require('axios');
const Employee = require("../models/schema/employee")

const authRouter = require('express').Router();

authRouter.post("/login", getAppData, async (req, res)=>{
    try{
        let  {clientAppId, clientAppSecret , auth_code} = req.body;

        let resData = await axios.post(process.env.AUTHX_URL+"/oauth/v2/access_token/",{
            clientAppId:String(clientAppId),
            clientSecret:String(clientAppSecret),
            auth_code : auth_code

        })
        let access_token = resData.data.access_token;
        let config = {
            headers:{
                "Authorization":"token "+String(access_token)
            }
        }
        resData = await axios.get(process.env.AUTHX_URL+"/api/user/",config);

        let user = resData.data.data;

        let foundUser = await Employee.findOne({email : user.EMAIL});
        if(foundUser == null)
        {
            foundUser = await Employee.create({name:user.NAME,email:user.EMAIL});
        }
        console.log(foundUser)
        let jwt_token = await createJWT(foundUser);

        return res.status(200).json({message: "Login Successfull",jwt_token})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "SERVER ERROR" });
    }
})

module.exports = authRouter