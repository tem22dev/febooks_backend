const jwt = require('jsonwebtoken');
const ms = require('ms');
require('dotenv').config();

const db = require('../app/models');
const query = require('../helper/query');
const encryption = require('../helper/encryption');

const registerService = async (userData) => {
    try {
        // Check email/phone are exist
        const isExistEmail = await query.findOne(db.User, { email: userData.email });
        if (isExistEmail) {
            return {
                errMessage: 'Email đã được đăng ký!',
                errCode: 1,
            };
        }

        const isExistPhone = await query.findOne(db.User, { phone: userData.phone });
        if (isExistPhone) {
            return {
                errMessage: 'Số điện thoại đã được đăng ký!',
                errCode: 1,
            };
        }

        // Hash user password
        const hashPass = encryption.hashPassword(userData.password);

        // Create new user
        const data = {
            fullname: userData.fullname,
            email: userData.email,
            phone: userData.phone,
            password: hashPass,
        };
        await query.create(db.User, data);

        return {
            message: 'Đăng ký tài khoản thành công!',
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

const loginService = async (rawData, res) => {
    try {
        // Check user
        const isExistEmail = await query.findOne(db.User, { email: rawData.email });
        if (isExistEmail) {
            const data = await query.getData(db.User, { email: rawData.email });
            const isCheckPass = encryption.checkPassword(rawData.password, data.password);

            if (isCheckPass) {
                const accessToken = jwt.sign({ email: data.email, id: data.id }, process.env.JWT_ACCESS_SECRET, {
                    expiresIn: process.env.JWT_ACCESS_EXPIRE_IN,
                });

                // const oneMonth = 30 * 24 * 60 * 60 * 1000; // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
                const oneMonth = ms(process.env.JWT_REFRESH_EXPIRE_IN);

                const refreshToken = jwt.sign({ email: data.email, id: data.id }, process.env.JWT_REFRESH_SECRET, {
                    expiresIn: process.env.JWT_REFRESH_EXPIRE_IN,
                });
                res.cookie('refresh_token', refreshToken, {
                    httpOnly: true,
                    maxAge: oneMonth,
                });

                return {
                    message: 'Đăng nhập tài khoản thành công!',
                    errCode: 0,
                    data: {
                        accessToken: accessToken,
                        user: {
                            id: data.id,
                            email: data.email,
                            phone: data.phone,
                            fullname: data.fullname,
                            role: data.role,
                            avatar: data.avatar,
                        },
                    },
                };
            }
            return {
                errMessage: 'Thông tin đăng nhập không chính xác!',
                errCode: 1,
                data: '',
            };
        }
        return {
            errMessage: 'Thông tin đăng nhập không chính xác!',
            errCode: 1,
            data: '',
        };
    } catch (error) {
        console.log(error);
        return {
            errMessage: 'Máy chủ không phản hồi',
            errCode: -2,
        };
    }
};

const accountService = async (rawData, accessToken) => {
    try {
        const isExistEmail = await query.findOne(db.User, { email: rawData.email });
        if (isExistEmail) {
            const data = await query.getData(db.User, { email: rawData.email });

            return {
                errCode: 0,
                data: {
                    accessToken: accessToken,
                    user: {
                        id: data.id,
                        email: data.email,
                        phone: data.phone,
                        fullname: data.fullname,
                        role: data.role,
                        avatar: data.avatar,
                    },
                },
            };
        }
        return {
            errMessage: 'User không tồn tại!',
            errCode: 1,
            data: '',
        };
    } catch (error) {
        console.log(error);
        return {
            errMessage: error,
            errCode: -2,
        };
    }
};

const logoutService = async (rawData, res) => {
    try {
        const isExistEmail = await query.findOne(db.User, { email: rawData.email });
        if (isExistEmail) {
            res.clearCookie('refresh_token', '', {
                expires: Date.now(),
            });
            return {
                errCode: 0,
                message: 'Đăng xuất thành công',
            };
        }
        return {
            errMessage: 'User không tồn tại!',
            errCode: 1,
            data: '',
        };
    } catch (error) {
        console.log(error);
        return {
            errMessage: error,
            errCode: -2,
        };
    }
};

const refreshTokenService = async (rawData) => {
    try {
        const data = await query.getData(db.User, { email: rawData.email });
        const accessToken = jwt.sign({ email: data.email, id: data.id }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: process.env.JWT_ACCESS_EXPIRE_IN,
        });

        return {
            errCode: 0,
            data: {
                accessToken: accessToken,
                user: {
                    id: data.id,
                    email: data.email,
                    phone: data.phone,
                    fullname: data.fullname,
                    role: data.role,
                    avatar: data.avatar,
                },
            },
        };
    } catch (error) {
        console.log(error);
        return {
            errMessage: error,
            errCode: -2,
        };
    }
};

module.exports = { registerService, loginService, accountService, logoutService, refreshTokenService };
