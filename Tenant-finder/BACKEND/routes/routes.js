const express = require('express');
const router = express.Router();
const login = require('../controllers/users/login');
const reg = require('../controllers/users/register');
const user = require('../controllers/users/user');
const category = require('../controllers/Landlord/category');
const rentals = require('../controllers/Landlord/rentals');

//routes for login and register
router.post('/users/login', login.login)
router.post('/users/register', reg.register)


//routes for category
router.get('/category/getCategory', category.getCategory)
router.post('/category/createCategory', category.postCategory)
router.put('/category/updateCategory/:id', category.updateCategory)


//routes for livestock
router.get('/rentals/getRentals', rentals.getRentals)
router.get('/rentals/getPostedRentals', rentals.getPostedRentals)
router.get('/rentals/getPostedRentalsByUser', rentals.getPostedRentalsByUser)
router.post('/rentals/createRentals', rentals.postRentals)
router.put('/rentals/updateRentals/:id', rentals.updateRentals)

module.exports = router;  