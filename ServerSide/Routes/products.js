const express = require('express')
const Productrouter = express.Router()
const productController = require("../Controllers/productController")
const dashboardController = require("../Controllers/dashboardController")
const searchController = require("../Controllers/searchController")
const authVerify = require("../middleware/authverify")

Productrouter.get('/search', authVerify, searchController)

Productrouter.get('/sortproducts', authVerify, dashboardController.getLatestProducts)
Productrouter.get('/:id', productController.getproductById)
Productrouter.get('/', authVerify, productController.getProducts)
Productrouter.post("/newproduct", authVerify, productController.addProduct)


module.exports = Productrouter