'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Book.belongsTo(models.Author, { foreignKey: 'authorID' });
            Book.belongsTo(models.Genres, { foreignKey: 'genreID' });
            Book.belongsTo(models.Publisher, { foreignKey: 'publisherID' });
            Book.belongsTo(models.Supplier, { foreignKey: 'supplierID' });
            Book.belongsTo(models.Language, { foreignKey: 'languageID' });
        }
    }
    Book.init(
        {
            title: DataTypes.STRING,
            publicationYear: DataTypes.INTEGER,
            ISBN: DataTypes.STRING,
            price: DataTypes.INTEGER,
            quantityAvailable: DataTypes.INTEGER,
            quantitySold: DataTypes.INTEGER,
            numOfPage: DataTypes.INTEGER,
            formality: DataTypes.STRING,
            packagingSize: DataTypes.STRING,
            thumbnail: DataTypes.STRING,
            slider: DataTypes.STRING,
            description: DataTypes.TEXT,
            // Foreign keys
            authorID: DataTypes.INTEGER,
            genreID: DataTypes.INTEGER,
            publisherID: DataTypes.INTEGER,
            supplierID: DataTypes.INTEGER,
            languageID: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Book',
        },
    );
    return Book;
};
