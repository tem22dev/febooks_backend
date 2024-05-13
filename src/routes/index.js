const siteRouter = require('./site');
const authRouter = require('./auth');
const userRouter = require('./user');

const route = (app) => {
    app.use('/api/site', siteRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
};

module.exports = route;
