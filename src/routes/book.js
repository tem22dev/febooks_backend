const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const bookController = require('../app/controllers/BookController');

// Thiết lập multer cho việc upload file avatar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'images', 'books'));
    },
    filename: function (req, file, cb) {
        // Đặt tên file mới dựa trên thời gian upload và extension của file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

router.post('/upload/image', upload.single('book'), bookController.uploadImageBook);
// router.post('/import/bulk-create', bookController.importBulkCreateBook);
router.delete('/delete/:id', bookController.deleteBook);
router.put('/update', bookController.updateBook);
router.post('/create', bookController.createBook);
router.get('/cate/author', bookController.getAllAuthor);
router.get('/cate/genre', bookController.getAllGenre);
router.get('/cate/publisher', bookController.getAllPublisher);
router.get('/cate/supplier', bookController.getAllSupplier);
router.get('/cate/language', bookController.getAllLanguage);
router.get('/search', bookController.searchBook);
router.get('/sliders', bookController.getSliderBook);
router.get('/one-book', bookController.getBookById);
router.get('/', bookController.getAllBook);

module.exports = router;
