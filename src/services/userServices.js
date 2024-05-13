const jwt = require('jsonwebtoken');
const ms = require('ms');
require('dotenv').config();

const db = require('../app/models');
const query = require('../helper/query');
const encryption = require('../helper/encryption');

const getAllUserService = async () => {
    try {
        const users = await db.User.findAll();
        const isUsers = users.every((user) => user instanceof db.User);
        if (isUsers) {
            const listUser = users.map((user) => ({
                key: user.id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                address: user.address,
                active: user.active,
                role: user.role,
                avatar: user.avatar,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }));

            return {
                message: 'Lấy danh sách người dùng thành công!',
                errCode: 0,
                data: listUser,
            };
        }
    } catch (error) {
        return {
            errMessage: error,
            errCode: -2,
        };
    }
};

module.exports = { getAllUserService };
