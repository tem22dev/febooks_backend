const { Op } = require('sequelize');
const ms = require('ms');
require('dotenv').config();

const db = require('../app/models');
const query = require('../helper/query');
const encryption = require('../helper/encryption');

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

module.exports = {
    getAuthorService,
    getGenreService,
    getPublisherService,
    getSupplierService,
    getLanguageService,
};
