'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            OrderDetail.belongsTo(models.Order, { foreignKey: 'orderID' });
        }
    }
    OrderDetail.init(
        {
            orderID: DataTypes.INTEGER,
            bookID: DataTypes.INTEGER,
            bookName: DataTypes.STRING,
            quantity: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'OrderDetail',
        },
    );
    return OrderDetail;
};
