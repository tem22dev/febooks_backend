const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const ms = require('ms');
require('dotenv').config();

const db = require('../app/models');
const query = require('../helper/query');
const encryption = require('../helper/encryption');

const getAllBookService = async () => {
    try {
        // console.log(123);
        const books = await db.Book.findAll({
            attributes: [
                'id',
                'title',
                'publicationYear',
                'ISBN',
                'price',
                'quantityAvailable',
                'quantitySold',
                'numOfPage',
                'formality',
                'packagingSize',
                'thumbnail',
                'slider',
                'description',
                'createdAt',
                'updatedAt',
            ],
            include: [
                {
                    model: db.Author,
                    attributes: ['nameAuthor'],
                },
                {
                    model: db.Genres,
                    attributes: ['nameGenre'],
                },
                {
                    model: db.Publisher,
                    attributes: ['namePublisher'],
                },
                {
                    model: db.Supplier,
                    attributes: ['nameSupplier'],
                },
                {
                    model: db.Language,
                    attributes: ['nameLanguage'],
                },
            ],
        });
        const isBooks = books.every((book) => book instanceof db.Book);
        if (isBooks) {
            return {
                message: 'Lấy danh sách thành công!',
                errCode: 0,
                data: books,
            };
        }
    } catch (error) {
        return {
            errMessage: error.message,
            errCode: -2,
        };
    }
};

const searchBookService = async (params) => {
    try {
        // Create a where condition array for the Book model
        let bookWhere = {};
        if (params.title) {
            bookWhere.title = { [Op.like]: `%${params.title}%` };
        }
        if (params.publicationYear) {
            bookWhere.publicationYear = { [Op.like]: `%${params.publicationYear}%` };
        }
        if (params.ISBN) {
            bookWhere.ISBN = { [Op.like]: `%${params.ISBN}%` };
        }
        // Add more conditions for the Book model as needed

        // Create a where condition for the Author model
        let authorWhere = {};
        if (params.nameAuthor) {
            authorWhere.nameAuthor = { [Op.like]: `%${params.nameAuthor}%` };
        }

        // Create a where condition for the Genre model
        let genreWhere = {};
        if (params.nameGenre) {
            genreWhere.nameGenre = { [Op.like]: `%${params.nameGenre}%` };
        }

        const data = await db.Book.findAll({
            attributes: [
                'id',
                'title',
                'publicationYear',
                'ISBN',
                'price',
                'quantityAvailable',
                'quantitySold',
                'numOfPage',
                'formality',
                'packagingSize',
                'thumbnail',
                'slider',
                'description',
                'createdAt',
                'updatedAt',
            ],
            include: [
                {
                    model: db.Author,
                    attributes: ['nameAuthor'],
                    where: authorWhere,
                },
                {
                    model: db.Genres,
                    attributes: ['nameGenre'],
                    where: genreWhere,
                },
            ],
            where: bookWhere,
        });

        return {
            data,
            errCode: 0,
        };
    } catch (error) {
        return {
            a: 1,
            errMessage: error,
            errCode: -2,
        };
    }
};

const createBookService = async (user) => {
    try {
        // Check email/phone are exist
        const isExistEmail = await query.findOne(db.Book, { email: user.email });
        if (isExistEmail) {
            return {
                errMessage: 'Email đã được đăng ký!',
                errCode: 1,
            };
        }

        const isExistPhone = await query.findOne(db.Book, { phone: user.phone });
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
        await query.create(db.Book, data);

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

const importBookService = async (data) => {
    try {
        let errors = [];

        // Use for...of with async/await for sequential processing
        for (const [index, item] of data.entries()) {
            // Check if email/phone exists
            const isExistEmail = await query.findOne(db.Book, { email: item.email });
            const isExistPhone = await query.findOne(db.Book, { phone: item.phone });

            if (isExistEmail || isExistPhone) {
                errors.push(index + 1);
            } else if (errors.length === 0) {
                // Hash user password
                item.password = encryption.hashPassword(item.password);
                item.avatar = 'default-avatar.png';
            }
        }

        // If no errors, perform bulk create
        if (errors.length === 0) {
            const countSuccess = await db.Book.bulkCreate(data);
            return {
                message: `Đã thêm ${data.length} tài khoản người dùng thành công!`,
                errCode: 0,
            };
        }

        return {
            errMessage: errors,
            errCode: 1,
        };
    } catch (error) {
        console.log(error);
        return {
            errMessage: 'Máy chủ không phản hồi',
            errCode: -2,
        };
    }
};

const updateBookService = async (user) => {
    try {
        // Check email/phone are exist
        const isExistEmail = await query.findOne(db.Book, { email: user.email });
        if (!isExistEmail) {
            return {
                errMessage: 'Tài khoản không tồn tại, kiểm tra lại email!',
                errCode: 1,
            };
        }

        const isExistPhone = await query.findOne(db.Book, {
            phone: user.phone,
            email: {
                [Op.ne]: user.email,
            },
        });

        if (isExistPhone) {
            return {
                errMessage: 'Số điện thoại đã được đăng ký!',
                errCode: 1,
            };
        }

        if (!!user.password) {
            // Hash user password
            const hashPass = encryption.hashPassword(user.password);
            user.password = hashPass;
        }

        if (typeof user.avatar === 'object') {
            user.avatar = 'default-avatar.png';
        }

        // Update user
        await db.Book.update(user, {
            where: {
                email: user.email,
            },
        });

        return {
            message: 'Cập nhật tài khoản thành công!',
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

const deleteBookService = async (idDelete, idAuthor) => {
    try {
        if (parseInt(idDelete) === idAuthor) {
            return {
                errCode: 1,
                errMessage: 'Bạn không thể xoá chính mình 😂',
            };
        }
        const user = await db.Book.findByPk(idDelete);
        if (user.role === 'admin') {
            return {
                errCode: 1,
                errMessage: 'Tài khoản ngang cấp không thể xoá 😂',
            };
        }
        if (!user) {
            return {
                errCode: 1,
                errMessage: 'Không tìm thấy người dùng',
            };
        }

        await user.destroy();
        return {
            message: 'Xoá người dùng thành công!',
            errCode: 0,
        };
    } catch (error) {
        return {
            error: 'Đã xảy ra lỗi khi xóa người dùng',
            errCode: 1,
        };
    }
};

module.exports = {
    getAllBookService,
    searchBookService,
    createBookService,
    importBookService,
    updateBookService,
    deleteBookService,
};
