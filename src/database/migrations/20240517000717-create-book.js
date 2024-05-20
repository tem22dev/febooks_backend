'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Books', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },
            authorID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Authors', // name of the target table
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            genreID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Genres',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            publisherID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Publishers',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            supplierID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Suppliers',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            languageID: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Languages',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
            publicationYear: {
                type: Sequelize.INTEGER,
            },
            ISBN: {
                type: Sequelize.STRING,
            },
            price: {
                type: Sequelize.INTEGER,
            },
            quantityAvailable: {
                type: Sequelize.INTEGER,
            },
            quantitySold: {
                type: Sequelize.INTEGER,
            },
            numOfPage: {
                type: Sequelize.INTEGER,
            },
            formality: {
                type: Sequelize.STRING,
            },
            packagingSize: {
                type: Sequelize.STRING,
            },
            thumbnail: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.TEXT,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Books');
    },
};
