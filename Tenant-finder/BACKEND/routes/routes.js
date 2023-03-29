const express = require('express');

const user = require('../controllers/user')
const category = require('../controllers/rentals/category');
const rental = require('../controllers/rentals/rental');
const rentals = require('../controllers/posts');


const router = express.Router()
//routes for user
router.post('/login',user.login);
router.post('/register',user.register);

//routes for category
router.get('/category/getCategory', category.getCategory)
router.post('/category/postCategory', category.postCategory)
router.put('/category/updateCategory/:id', category.updateCategory)

//routes for Rental
router.get('/rental/getRental', rental.getRental)
router.get('/rental/getPostedRental', rental.getPostedRental)
router.get('/rental/getPostedRentalByUser', rental.getPostedRentalByUser)
router.post('/rental/postRental', rental.postRental)
router.put('/rental/updateRental/:id', rental.updateRental)

//routes for post
router.post('/addPost/:rental_id',rentals.addPost);
router.get('/getPosts',rentals.getPosts);


module.exports = router;