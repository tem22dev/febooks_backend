const express = require('express');
const morgan = require('morgan');

const app = express();
const host = 'localhost';
const port = 8080;

// HTTP logger
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(port, host, () => console.log(`Example app listening at http://localhost:${port}`));
