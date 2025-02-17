const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    image: {
        type: String
    }

}, {
    timestamps: true
})

const productModel = mongoose.model("products", productSchema)

module.exports = productModel