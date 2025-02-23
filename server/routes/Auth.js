const express = require('express');
const Router = express.Router();

const { signup, login, logout } = require('../controllers/auth');

//routes

Router.post('/signup', signup);

Router.post('/login', login);

Router.post('/logout', logout);

module.exports = Router;