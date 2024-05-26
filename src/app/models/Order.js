'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.hasMany(models.OrderDetail, { foreignKey: 'orderID' });
        }
    }
    Order.init(
        {
            userID: DataTypes.INTEGER,
            totalPrice: DataTypes.INTEGER,
            deliveryAddress: DataTypes.STRING,
            status: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'Order',
        },
    );
    return Order;
};