'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SliderBook extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            SliderBook.belongsTo(models.Book, { foreignKey: 'bookID' });
        }
    }
    SliderBook.init(
        {
            filename: DataTypes.STRING,
            bookID: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'SliderBook',
        },
    );
    return SliderBook;
};
