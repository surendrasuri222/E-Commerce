const express = require('express');
const wishlistrouter = express.Router();
const Wishlist = require('../Models/wishlist');
const wishlistcontroller = require('../Controllers/wishlistController')

wishlistrouter.post('/add/:userId', wishlistcontroller.addwishlist);
wishlistrouter.post('/remove/:userId', wishlistcontroller.removeWishlist);
wishlistrouter.get('/:userId', wishlistcontroller.getwishlistItems)

module.exports = wishlistrouter;

