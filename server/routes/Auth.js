const express = require('express');
const Router = express.Router();
const upload = require('../utils/multerConfig');

const { signup, login, logout } = require('../controllers/auth');

//routes

Router.post('/signup', upload.single("image"), signup);

Router.post('/login', login);

Router.post('/logout', logout);

module.exports = Router;