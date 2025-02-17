const userModel = require("../Models/Usermodel")

exports.getUserById = (req, res) => {
    const id = req.params.id;
    if (id != null) {
        userModel.findById(id)
            .then((data) => res.status(200).json(data))
            .catch((err) => res.status(400).send({ error: err }))
    }
    else {
        res.status(401).send(`Id does not exist`)
    }
}

exports.updateUserById = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    userModel.findByIdAndUpdate(id, updatedData)
        .then((data) => res.status(204).send(data))
        .catch((err) => res.status(404).send("User not found: " + err));
}