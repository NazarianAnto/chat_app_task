require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require("helmet");
const path = require('path');
const utilSocketIo = require('./src/socketServer');


const port = process.env.PORT || 8000;
const host = process.env.HOST || 'localhost';

app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.set('view engine', 'pug')
app.set('views', './assets/view')


app.get('/status', async (req, res) => {
    const config = {
        connectionLimit: 10,
        host: process.env.SQL_HOST,
        port: process.env.SQL_PORT,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
        debug: false,
        waitForConnections: true,
        multipleStatements: true,
        queueLimit: 0
    };
    res.status(200).json(config)
});


app.get('/', (req, res) => { res.status(200).send(`server is running On ${host}:${port}`) })


app.listen(port, host, () => {
    console.warn(`Server is listening on ${host}:${port}...Node`)
    utilSocketIo.startSocket();
});