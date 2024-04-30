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

const loginService = async (rawData) => {
    try {
        // Check user
        const isExistEmail = await query.findOne(db.User, { email: rawData.email });
        if (isExistEmail) {
            const data = await query.getData(db.User, { email: rawData.email });
            const isCheckPass = encryption.checkPassword(rawData.password, data.password);

            if (isCheckPass) {
                return {
                    message: 'Đăng nhập tài khoản thành công!',
                    errCode: 0,
                    data: data,
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

module.exports = { registerService, loginService };
