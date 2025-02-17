const productModel = require("../Models/Product")

exports.addProduct = (req, res) => {
    const newProduct = req.body;
    if (newProduct != null) {
        productModel.create(newProduct)
            .then((data) => res.status(201)
                .send("Product created successfully"))
            .catch((err) => {
                res.status(400).send({ error: err })
            })
    }
    else {
        res.status(400).send("product not created")
    }
}

exports.getProducts = (req, res) => {
    productModel.find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).send({ error: err }))
}

exports.getproductById = (req, res) => {
    const id = req.params.id;
    if (id != null) {
        productModel.findById(id)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).send({ error: err }))
    }
    else {
        res.status(401).send(`Id does not exist`)
    }
}
