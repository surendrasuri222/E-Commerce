
const productModel = require("../Models/Product");

exports.getLatestProducts = async (req, res) => {
    try {
        const data = await productModel.find().sort({ _id: -1 }).limit(5);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};
