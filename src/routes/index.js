const accountRouter = require('./accounts');

const route = (app) => {
    app.use('/account', accountRouter);
};

module.exports = route;
