const accountRouter = require('./accounts');

const route = (app) => {
    app.use('/api/account', accountRouter);
};

module.exports = route;
