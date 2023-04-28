const AppData = require("../models/schema/appData");
const axios = require('axios');

const initApp = async ()=>{
    try{
        let appData = await AppData.find({});
        if(appData.length == 0)
        {
            let name = process.env.CLIENT_APP_NAME;
            let scopes = process.env.CLIENT_APP_SCOPES.split(",");
            let res = await axios.post(process.env.AUTHX_URL+"/api/clientApp/register",{
                name:name,
                scopes:scopes,
                description:" ",
                redirectUri:`${process.env.FRONTEND_URL}`
            })
            await AppData.create({
                name:name,
                description:res.data.cred.description,
                scopes:res.data.cred.scopes,
                redirectUri:res.data.cred.redirectUri,
                clientAppId:res.data.cred.clientAppId,
                clientAppSecret:res.data.cred.clientAppSecret
            })
            console.log("CLIENT APP SUCCESSFULLY INIT")
        }
    }
    catch(err)
    {
        console.log(err)
        console.log("CLIENT APP INIT FAILED")
    }    
}
module.exports = initApp;