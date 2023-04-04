require('dotenv').config({ src: ".env" })
const mongoose = require('mongoose');
const initApp = require('../helpers/initApp');
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', async() => {
    console.log('connected to database');
});

initApp();