const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({ src: ".env" })
require('./src/models/db');
const verifyAdmin = require('./src/middleware/verifyAdmin')

app.get('/', (req, res) => {
    res.send('Task Portal backend is up and running!!!');
});

app.use(cors());
app.use(express.json());

app.use('/api', require('./src/controllers/api'));
app.use('/auth', require('./src/controllers/auth'));
app.use('/admin',verifyAdmin ,require('./src/controllers/admin'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})