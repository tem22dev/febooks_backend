const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');

const route = require('./routes');
const db = require('./config/database');
dotenv.config();

const app = express();
const host = process.env.HOST_NAME;
const port = process.env.PORT || 8081;

// Connect to db
db.connect();

// Middleware send data client to server (XMLHttpRequest, fetch, axios, JQuery(Ajax) ...)
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// HTTP logger
app.use(morgan('combined'));

// Routes init
route(app);

app.listen(port, host, () => console.log(`Example app listening at http://localhost:${port}`));
