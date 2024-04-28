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
        const hashPass = await encryption.hashPassword(userData.password);

        // Create new user
        const data = {
            fullname: userData.fullname,
            email: userData.email,
            phone: userData.phone,
            password: hashPass,
        };
        await query.create(db.User, data);

        return {
            statusCode: 200,
            message: 'Đăng ký tài khoản thành công!',
            errCode: 0,
        };
    } catch (error) {
        return {
            errMessage: 'Máy chủ không phản hồi',
            errCode: -2,
        };
    }
};

module.exports = { registerService };
