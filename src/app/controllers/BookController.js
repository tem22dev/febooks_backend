const jwt = require('jsonwebtoken');
const ms = require('ms');
const { Op } = require('sequelize');
require('dotenv').config();

const db = require('../models');
const query = require('../../helper/query');
const book = require('../../services/bookServices');

class BookController {
    // [GET]: /
    async getAllBook(req, res) {
        try {
            const data = await book.getAllBookService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /sort
    async getAllBookSort(req, res) {
        try {
            const { current = 1, pageSize = 30, priceMin, priceMax, category, sort } = req.query;

            // Chuyển đổi current và pageSize sang kiểu số nguyên
            const page = parseInt(current, 10);
            const limit = parseInt(pageSize, 10);
            const offset = (page - 1) * limit;

            // Xây dựng đối tượng order dựa trên sort
            let order = [];
            if (sort) {
                const isMinus = sort.slice(0, 1);
                const [key, direction] = isMinus === '-' ? [sort.substring(1), 'DESC'] : [sort, 'ASC'];
                order.push([key, direction]);
            }

            // Xây dựng đối tượng category nếu có
            let where = {};
            if (category) {
                // Nếu có thể loại được chọn, thêm điều kiện vào where
                let temp = category.split(',');
                let values = [];
                for (const key of temp) {
                    values.push({ genreID: key });
                }
                where[Op.or] = values;
            }

            if (priceMin || priceMax) {
                // Nếu có khoảng giá được chọn, thêm điều kiện vào where
                where['price'] = {};
                if (priceMin) {
                    where['price'][Op.gte] = parseInt(priceMin, 10);
                }
                if (priceMax) {
                    where['price'][Op.lte] = parseInt(priceMax, 10);
                }
            }

            const { rows: books, count: total } = await db.Book.findAndCountAll({
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
                where,
                order,
                limit,
                offset,
            });

            return res.status(200).json({
                result: books,
                meta: {
                    total,
                    page,
                    pageSize: limit,
                },
            });
        } catch (error) {
            console.error('Error in getAllBookSort:', error);
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /sliders
    async getSliderBook(req, res) {
        try {
            const data = await book.getSliderBookByIdService(req.query);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /one-book
    async getBookById(req, res) {
        try {
            const data = await book.getBookByIdService(req.query);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /search
    async searchBook(req, res) {
        try {
            const data = await book.searchBookService(req.query);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /cate/author
    async getAllAuthor(req, res) {
        try {
            const data = await book.getAuthorService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /cate/genre
    async getAllGenre(req, res) {
        try {
            const data = await book.getGenreService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /cate/publisher
    async getAllPublisher(req, res) {
        try {
            const data = await book.getPublisherService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /cate/supplier
    async getAllSupplier(req, res) {
        try {
            const data = await book.getSupplierService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [GET]: /cate/language
    async getAllLanguage(req, res) {
        try {
            const data = await book.getLanguageService();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [POST]: /create
    async createBook(req, res) {
        try {
            const data = await book.createBookService(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [POST]: /books/upload/image
    async uploadImageBook(req, res) {
        try {
            // Nếu không có file được tải lên, trả về lỗi
            if (!req.file) {
                return res.status(400).json({ message: 'Không có tập tin nào được tải lên' });
            }
            // Trả về thông tin về file đã được tải lên
            res.json({ message: 'Hình đại diện đã được tải lên thành công', file: req.file });
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // // [POST]: /import/bulk-create
    // async importBulkCreateBook(req, res) {
    //     try {
    //         const data = await book.importBookService(req.body);
    //         return res.status(200).json(data);
    //     } catch (error) {
    //         return res.status(500).json({
    //             errMessage: 'Lỗi từ server',
    //             errCode: 1,
    //         });
    //     }
    // }

    // [PUT]: /update
    async updateBook(req, res) {
        try {
            const data = await book.updateBookService(req.body);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({
                errMessage: 'Lỗi từ server',
                errCode: 1,
            });
        }
    }

    // [DELETE]: /delete/:id
    async deleteBook(req, res) {
        try {
            const data = await book.deleteBookService(req.params.id);
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa người dùng' });
        }
    }
}

module.exports = new BookController();
