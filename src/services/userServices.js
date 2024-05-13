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

const createUserService = async (user) => {
    try {
        // Check email/phone are exist
        const isExistEmail = await query.findOne(db.User, { email: user.email });
        if (isExistEmail) {
            return {
                errMessage: 'Email đã được đăng ký!',
                errCode: 1,
            };
        }

        const isExistPhone = await query.findOne(db.User, { phone: user.phone });
        if (isExistPhone) {
            return {
                errMessage: 'Số điện thoại đã được đăng ký!',
                errCode: 1,
            };
        }

        // Hash user password
        const hashPass = encryption.hashPassword(user.password);

        // Create new user
        const data = {
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            password: hashPass,
            gender: user.gender,
            active: user.active,
            address: user.address,
            role: user.role,
            avatar: user.avatar ? user.avatar : 'default-avatar.png',
        };
        await query.create(db.User, data);

        return {
            message: 'Thêm tài khoản người dùng thành công!',
            errCode: 0,
        };
    } catch (error) {
        console.log(error);
        return {
            errMessage: 'Máy chủ không phản hồi',
            errCode: -2,
        };
    }
};

module.exports = { getAllUserService, searchUserService, createUserService };
