const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const route = require('./routes');
const db = require('./config/connectDB');
dotenv.config();

const app = express();
const host = process.env.HOST_NAME;
const port = process.env.PORT || 8081;

// Middleware send data client to server (XMLHttpRequest, fetch, axios, JQuery(Ajax) ...)
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Cookie
app.use(cookieParser());

// Fix CORS
app.use(cors({ origin: process.env.URL_REACT, credentials: true }));

// Connect to db
// db.connect();

// HTTP logger
// app.use(morgan('combined'));

// Routes init
route(app);

app.listen(port, host, () => console.log(`App listening at http://localhost:${port}`));
