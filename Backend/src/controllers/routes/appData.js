const AppDataRouter = require("express").Router();
const axios = require('axios');
const AppData = require("../../models/schema/appData");

AppDataRouter.get("/", async (req, res) => {
  try {
    let  {clientAppId, clientAppSecret} = req.body;
    
    let resData = await axios.post(process.env.AUTHX_URL+"/api/clientApp/get",{
        clientAppId:clientAppId,
        clientAppSecret:clientAppSecret
    })

    return res.status(200).json(resData.data);
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
});

AppDataRouter.put("/", async (req, res) => {
  try {
    let  {clientAppId, clientAppSecret , description , redirectUri} = req.body;
    if (
      !(typeof description === "string") &&
      !(typeof redirectUri === "string")
    ) return res.status(400).json({ message: "NOT IN REQUIRED FORMAT" });

    let appData = await AppData.find({});

    let resData = await axios.put(process.env.AUTHX_URL+"/api/clientApp/",{
        clientAppId:String(clientAppId),
        clientAppSecret:String(clientAppSecret),
        description: description == null ? appData[0].description : description,
        redirectUri: redirectUri == null ? appData[0].redirectUri : redirectUri

    })

    appData[0].description = description == null ? appData[0].description : description;
    appData[0].redirectUri = redirectUri == null ? appData[0].redirectUri : redirectUri;

    await appData[0].save();

    return res.status(200).json({ message: "UPDATE SUCCESS", data:appData[0]});
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
});

AppDataRouter.delete("/", async (req, res) => {
  try {
    let  {clientAppId, clientAppSecret} = req.body;

    await axios.post(process.env.AUTHX_URL+"/api/clientApp/delete",{
        clientAppId:String(clientAppId),
        clientAppSecret:String(clientAppSecret)
    })
    
    let appData = await AppData.find({});
    await AppData.deleteOne({_id : appData[0]._id});

    return res.status(200).json({ message: "SUCCESSFULLY DELETED" });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "SERVER ERROR" });
  }
});

module.exports = AppDataRouter;