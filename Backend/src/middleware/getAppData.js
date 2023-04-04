const AppData = require("../models/schema/appData");
const getAppData = async(req,res,next) =>{
    let appData = await AppData.find({});
    if(appData.length == 0)
    {
        return res.status(405).json({ message: 'APP DATA NOT INITIALIZED' });
    }
    req.body.clientAppId = appData[0].clientAppId;
    req.body.clientAppSecret = appData[0].clientAppSecret;

    return next();
}
module.exports = getAppData;