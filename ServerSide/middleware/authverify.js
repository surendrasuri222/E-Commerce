
const jwt = require('jsonwebtoken');

async function authVerify(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(token);
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decode", decode);
        next();
    } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
            res.status(400).json({
                message: "Unauthorized access",
                error: true,
                success: false
            });
        } else {
            res.status(500).json({
                message: "Not Available",
                error: true,
                success: false
            });
        }
    }
}

module.exports = authVerify;
