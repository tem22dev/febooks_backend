const userRouter = require('./auth');
const siteRouter = require('./site');

const route = (app) => {
    app.use('/api/auth', userRouter);
    app.use('/api/site', siteRouter);
};

module.exports = route;
