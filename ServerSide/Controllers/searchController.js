const productModel = require("../Models/Product")

const searchController = async (req, res) => {
    try {
        const { q } = req.query; // q is the query parameter for the product name
        // Find products with category matching the search query
        const results = await productModel.find({
            productname: { $regex: new RegExp(q, 'i') },
        });
        res.json(results);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = searchController
