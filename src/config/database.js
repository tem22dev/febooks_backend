const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('febooks', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection successfully');
    } catch (error) {
        console.log('Connect failure ', error);
    }
};

module.exports = { connect };
