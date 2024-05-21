const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const ms = require('ms');
require('dotenv').config();

const db = require('../app/models');
const query = require('../helper/query');
const encryption = require('../helper/encryption');

const getAllBookService = async () => {
    try {
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

const getSliderBookByIdService = async (obj) => {
    try {
        if (obj.idBook) {
            const listSlider = await db.SliderBook.findAll({
                where: {
                    bookID: obj.idBook,
                },
            });
            return {
                data: listSlider,
                errCode: 0,
            };
        }
    } catch (error) {
        return {
            errMessage: error,
            errCode: -2,
        };
    }
};

const getBookByIdService = async (obj) => {
    try {
        if (obj?.id) {
            const book = await db.Book.findOne({
                where: {
                    id: obj.id,
                },
            });

            return {
                data: book,
                errCode: 0,
            };
        }
    } catch (error) {
        return {
            errMessage: error,
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
                {
                    model: db.Language,
                    attributes: ['nameLanguage'],
                    // where: languageWhere,
                },
                {
                    model: db.Supplier,
                    attributes: ['nameSupplier'],
                    // where: supplierWhere,
                },
                {
                    model: db.Publisher,
                    attributes: ['namePublisher'],
                    // where: publisher,
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
            errMessage: error,
            errCode: -2,
        };
    }
};

const getAuthorService = async () => {
    try {
        const authors = await db.Author.findAll();
        const isAuthor = authors.every((author) => author instanceof db.Author);
        if (isAuthor) {
            return {
                message: 'Lấy danh sách tác giả thành công!',
                errCode: 0,
                data: authors,
            };
        }
    } catch (error) {
        return {
            errMessage: error,
            errCode: -2,
        };
    }
};

const getGenreService = async () => {
    try {
        const genres = await db.Genres.findAll();
        const isGenre = genres.every((genre) => genre instanceof db.Genres);
        if (isGenre) {
            return {
                message: 'Lấy danh sách thể loại thành công!',
                errCode: 0,
                data: genres,
            };
        }
    } catch (error) {
        return {
            errMessage: error,
            errCode: -2,
        };
    }
};

const getPublisherService = async () => {
    try {
        const publishers = await db.Publisher.findAll();
        const isPublisher = publishers.every((publisher) => publisher instanceof db.Publisher);
        if (isPublisher) {
            return {
                message: 'Lấy danh sách nhà xuất bản thành công!',
                errCode: 0,
                data: publishers,
            };
        }
    } catch (error) {
        return {
            errMessage: error,
            errCode: -2,
        };
    }
};

const getSupplierService = async () => {
    try {
        const suppliers = await db.Supplier.findAll();
        const isSupplier = suppliers.every((supplier) => supplier instanceof db.Supplier);
        if (isSupplier) {
            return {
                message: 'Lấy danh sách nhà cung cấp thành công!',
                errCode: 0,
                data: suppliers,
            };
        }
    } catch (error) {
        return {
            errMessage: error,
            errCode: -2,
        };
    }
};

const getLanguageService = async () => {
    try {
        const languages = await db.Language.findAll();
        const isLanguage = languages.every((language) => language instanceof db.Language);
        if (isLanguage) {
            return {
                message: 'Lấy danh sách ngôn ngữ thành công!',
                errCode: 0,
                data: languages,
            };
        }
    } catch (error) {
        return {
            errMessage: error,
            errCode: -2,
        };
    }
};

const createBookService = async (book) => {
    try {
        if (book?.ISBN) {
            const ISBN = await query.findOne(db.Book, { ISBN: book?.ISBN });
            if (ISBN) {
                return {
                    errMessage: 'Số ISBN đã bị trùng!',
                    errCode: 1,
                };
            }
        }

        // Create new book
        const data = {
            ISBN: book?.ISBN,
            genreID: book.nameGenre,
            description: book.description,
            formality: book.formality,
            authorID: book.nameAuthor,
            publisherID: book.namePublisher,
            supplierID: book.nameSupplier,
            numOfPage: book.numOfPage,
            price: book.price,
            publicationYear: book.publicationYear,
            quantityAvailable: book.quantityAvailable,
            quantitySold: book.quantitySold,
            title: book.title,
            packagingSize: book.packagingSize,
            languageID: book.language,
            thumbnail: book.thumbnail,
        };

        const createBook = await db.Book.create(data);
        const bookID = createBook.id;
        if (!!bookID) {
            const dataSlider = book.slider.map((item) => ({
                bookID: bookID,
                filename: item,
            }));

            await db.SliderBook.bulkCreate(dataSlider);

            return {
                message: 'Thêm sách thành công!',
                errCode: 0,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            errMessage: 'Máy chủ không phản hồi',
            errCode: -2,
        };
    }
};

// const importBookService = async (data) => {
//     try {
//         let errors = [];

//         // Use for...of with async/await for sequential processing
//         for (const [index, item] of data.entries()) {
//             // Check if email/phone exists
//             const isExistEmail = await query.findOne(db.Book, { email: item.email });
//             const isExistPhone = await query.findOne(db.Book, { phone: item.phone });

//             if (isExistEmail || isExistPhone) {
//                 errors.push(index + 1);
//             } else if (errors.length === 0) {
//                 // Hash user password
//                 item.password = encryption.hashPassword(item.password);
//                 item.avatar = 'default-avatar.png';
//             }
//         }

//         // If no errors, perform bulk create
//         if (errors.length === 0) {
//             const countSuccess = await db.Book.bulkCreate(data);
//             return {
//                 message: `Đã thêm ${data.length} tài khoản người dùng thành công!`,
//                 errCode: 0,
//             };
//         }

//         return {
//             errMessage: errors,
//             errCode: 1,
//         };
//     } catch (error) {
//         console.log(error);
//         return {
//             errMessage: 'Máy chủ không phản hồi',
//             errCode: -2,
//         };
//     }
// };

const updateBookService = async (book) => {
    try {
        const isExistISBN = await query.findOne(db.Book, {
            ISBN: book.ISBN,
            id: {
                [Op.ne]: book.id,
            },
        });

        if (isExistISBN) {
            return {
                errMessage: 'Số ISBN đã được đăng ký!',
                errCode: 1,
            };
        }
        const { slider, ...rest } = book;

        // Update book
        await db.Book.update(rest, {
            where: {
                id: rest.id,
            },
        });

        // Update Slider
        const dataSlider = slider.map((item) => ({
            bookID: rest.id,
            filename: item,
        }));

        await db.SliderBook.destroy({
            where: {
                bookID: rest.id,
            },
        });
        await db.SliderBook.bulkCreate(dataSlider);

        return {
            message: 'Cập nhật sách thành công!',
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

// const deleteBookService = async (idDelete, idAuthor) => {
//     try {
//         if (parseInt(idDelete) === idAuthor) {
//             return {
//                 errCode: 1,
//                 errMessage: 'Bạn không thể xoá chính mình 😂',
//             };
//         }
//         const user = await db.Book.findByPk(idDelete);
//         if (user.role === 'admin') {
//             return {
//                 errCode: 1,
//                 errMessage: 'Tài khoản ngang cấp không thể xoá 😂',
//             };
//         }
//         if (!user) {
//             return {
//                 errCode: 1,
//                 errMessage: 'Không tìm thấy người dùng',
//             };
//         }

//         await user.destroy();
//         return {
//             message: 'Xoá người dùng thành công!',
//             errCode: 0,
//         };
//     } catch (error) {
//         return {
//             error: 'Đã xảy ra lỗi khi xóa người dùng',
//             errCode: 1,
//         };
//     }
// };

module.exports = {
    getAllBookService,
    getSliderBookByIdService,
    getBookByIdService,
    searchBookService,
    getAuthorService,
    getGenreService,
    getPublisherService,
    getSupplierService,
    getLanguageService,
    createBookService,
    // importBookService,
    updateBookService,
    // deleteBookService,
};
