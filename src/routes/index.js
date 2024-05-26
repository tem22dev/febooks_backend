const siteRouter = require('./site');
const authRouter = require('./auth');
const userRouter = require('./user');
const bookRouter = require('./book');
const cateRouter = require('./cate');
const orderRouter = require('./order');

const route = (app) => {
    app.use('/api/site', siteRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/books', bookRouter);
    app.use('/api/cate', cateRouter);
    app.use('/api/order', orderRouter);
};

module.exports = route;
