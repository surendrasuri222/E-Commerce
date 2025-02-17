const userModel = require("../Models/Usermodel")
const bcryptjs = require('bcryptjs');

async function signup(req, res) {
    try {

        const user = await userModel.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({
                message: "Already user exits",
                error: true,
                success: false
            })
        }

        //convert password into hash
        bcryptjs.genSalt(10, function (err, salt) {
            bcryptjs.hash(req.body.password, salt, async function (err, hash) {
                // Store hash in your password DB.
                if (err) {
                    return res.status(400).json({
                        message: err,
                        error: true,
                        success: false
                    })
                }
                console.log("hash", hash)

                const payload = {
                    ...req.body,
                    password: hash
                }

                const userDetails = new userModel(payload)
                const save = await userDetails.save()

                return res.status(200).json({
                    message: "User Created successfully",
                    data: save,
                    error: false,
                    success: true
                })

            });
        });

    } catch (error) {
        res.status(500).json({
            message: error,
            error: true,
            success: false
        })
    }
}


module.exports = signup