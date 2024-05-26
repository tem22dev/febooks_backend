const { Op } = require('sequelize');
const ms = require('ms');
require('dotenv').config();

const db = require('../app/models');
const query = require('../helper/query');
const encryption = require('../helper/encryption');

const createOrderService = async (orderData) => {
    const transaction = await db.sequelize.transaction();
    try {
        const { userID, totalPrice, deliveryAddress, detail } = orderData;
        console.log(orderData);

        const newOrder = await db.Order.create(
            {
                userID,
                totalPrice,
                deliveryAddress,
                status: 1, // Assuming 1 means 'pending' or similar
            },
            { transaction },
        );

        const orderDetails = detail.map((item) => ({
            orderID: newOrder.id,
            bookID: item.id,
            bookName: item.bookName,
            quantity: item.quantity,
        }));

        await db.OrderDetail.bulkCreate(orderDetails, { transaction });

        // Update the quantitySold for each book
        for (const item of detail) {
            await db.Book.increment({ quantitySold: item.quantity }, { where: { id: item.id }, transaction });
        }

        await transaction.commit();

        return {
            success: true,
            data: newOrder,
        };
    } catch (error) {
        await transaction.rollback();
        return {
            success: false,
            errMessage: error.message,
        };
    }
};

const getHistoryService = async (userID) => {
    try {
        const orders = await db.Order.findAll({
            where: { userID },
            include: [
                {
                    model: db.OrderDetail,
                },
            ],
        });
        return {
            success: true,
            data: orders,
        };
    } catch (error) {
        return {
            success: false,
            errMessage: error.message,
        };
    }
};

module.exports = {
    createOrderService,
    getHistoryService,
};
