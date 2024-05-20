const jwt = require('jsonwebtoken');
const ms = require('ms');
require('dotenv').config();

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

    // // [PUT]: /update
    // async updateBook(req, res) {
    //     try {
    //         const data = await book.updateBookService(req.body);
    //         return res.status(200).json(data);
    //     } catch (error) {
    //         return res.status(500).json({
    //             errMessage: 'Lỗi từ server',
    //             errCode: 1,
    //         });
    //     }
    // }

    // // [DELETE]: /delete/:id
    // async deleteBook(req, res) {
    //     try {
    //         const authHeader = req.headers['authorization'];
    //         if (authHeader) {
    //             // Kiểm tra xem header Authorization có chứa token Bearer không
    //             const token = authHeader.split(' ')[1];
    //             const validToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    //             const data = await book.deleteBookService(req.params.id, validToken.id);
    //             return res.status(200).json(data);
    //         }
    //     } catch (error) {
    //         return res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa người dùng' });
    //     }
    // }
}

module.exports = new BookController();
