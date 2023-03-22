const express = require('express');
const router = express.Router();
const login = require('../controllers/users/login');
const reg = require('../controllers/users/register');
const user = require('../controllers/users/user');

//routes for login and registering
router.post('/users/login', login.login)
router.post('/users/register', reg.register)

module.exports = router;  