const getAppData = require('../middleware/getAppData');
const AppDataRouter = require('./routes/appData');

const admin = require('express').Router();

admin.use('/appData', getAppData, AppDataRouter);

module.exports = admin