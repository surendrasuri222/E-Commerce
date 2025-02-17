const express = require('express');
const Wishlist = require('../Models/wishlist');

exports.addwishlist = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.productId;
    try {
        // Validate input
        if (!userId || !productId) {
            return res.status(400).json({ error: 'Please provide userId and productId.' });
        }

        // Find the user's wishlist or create a new one if it doesn't exist
        let wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            wishlist = new Wishlist({ userId, products: [] });
        }

        // Check if product already exists in wishlist
        if (wishlist.products.includes(productId)) {
            return res.status(400).json({ error: 'Product already in wishlist' });
        }

        // Add product to wishlist
        wishlist.products.push(productId);
        await wishlist.save();

        res.json({ message: 'Product added to wishlist successfully' });
    } catch (error) {
        console.error('Error adding product to wishlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

exports.removeWishlist = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.body.productId;

    try {
        // Validate input
        if (!userId || !productId) {
            return res.status(400).json({ error: 'Please provide userId and productId.' });
        }

        // Find the user's wishlist
        const wishlist = await Wishlist.findOne({ userId });
        if (!wishlist) {
            return res.status(404).json({ error: 'Wishlist not found' });
        }

        // Check if product exists in wishlist
        const index = wishlist.products.indexOf(productId);
        if (index === -1) {
            return res.status(400).json({ error: 'Product not found in wishlist' });
        }

        // Remove product from wishlist
        wishlist.products.splice(index, 1);
        await wishlist.save();

        res.json({ message: 'Product removed from wishlist successfully' });
    } catch (error) {
        console.error('Error removing product from wishlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getwishlistItems = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find wishlist items for the specified user ID
        const wishlistItems = await Wishlist.find({ userId });

        res.json({ wishlistItems });
    } catch (error) {
        console.error('Error fetching wishlist items:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}
