const siteRouter = require('./site');
const authRouter = require('./auth');
const userRouter = require('./user');
const bookRouter = require('./book');

const route = (app) => {
    app.use('/api/site', siteRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/books', bookRouter);
};

module.exports = route;
