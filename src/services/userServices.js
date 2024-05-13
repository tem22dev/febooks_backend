const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const ms = require('ms');
require('dotenv').config();

const db = require('../app/models');
const query = require('../helper/query');
const encryption = require('../helper/encryption');

const getAllUserService = async () => {
    try {
        const users = await db.User.findAll({
            attributes: {
                exclude: ['password'],
            },
        });
        const isUsers = users.every((user) => user instanceof db.User);
        if (isUsers) {
            return {
                message: 'Lấy danh sách người dùng thành công!',
                errCode: 0,
                data: users,
            };
        }
    } catch (error) {
        return {
            errMessage: error,
            errCode: -2,
        };
    }
};

const searchUserService = async (params) => {
    try {
        let where = {};
        for (const key in params) {
            let param = {
                [`${key}`]: {
                    [Op.like]: `%${params[key]}%`,
                },
            };
            where = { ...param, ...where };
        }

        const data = await db.User.findAll({
            where: {
                [Op.and]: [where],
            },
            attributes: {
                exclude: ['password'],
            },
        });

        return {
            data,
            errCode: 0,
        };
    } catch (error) {
        return {
            errMessage: error,
            errCode: -2,
        };
    }
};

module.exports = { getAllUserService, searchUserService };
