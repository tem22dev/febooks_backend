require('dotenv').config();
const express = require('express');
const morgan = require('morgan');

const route = require('./routes');

const app = express();
const host = process.env.HOST_NAME;
const port = process.env.PORT || 8081;

// HTTP logger
app.use(morgan('combined'));

// Routes init
route(app);

app.listen(port, host, () => console.log(`Example app listening at http://localhost:${port}`));
