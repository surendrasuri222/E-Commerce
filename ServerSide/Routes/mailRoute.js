const express = require('express');
const mailController = require('../Controllers/mailController')
const mailrouter = express.Router();

mailrouter.post("/sendmail", mailController)

module.exports = mailrouter