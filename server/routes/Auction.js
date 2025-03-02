const express = require('express');
const Router = express.Router();
const upload = require('../utils/multerConfig');

const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');

//controllers
const { createCategory, fetchAllCategory, fetchAllCategoryPosts } = require('../controllers/category');
const { createAuction, fetchAllAuctions, deleteAuction } = require('../controllers/auction');

//routes for category
Router.post('/createCategory', authMiddleware, isAdmin, createCategory);

Router.get('/getAllCategories', fetchAllCategory);

Router.get('/getAllCategoryPosts', fetchAllCategoryPosts);

//routes for auction
Router.post('/createAuction', authMiddleware, upload.single('image'), createAuction);

Router.get('/getAuctions', authMiddleware, fetchAllAuctions);

Router.delete("/deleteAuction/:auctionId", authMiddleware, deleteAuction);

module.exports = Router;