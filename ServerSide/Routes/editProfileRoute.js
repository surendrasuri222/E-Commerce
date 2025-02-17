const express = require('express');
const profileController = require('../Controllers/editprofileController')
const editprofiledataRouter = express.Router();

editprofiledataRouter.put("/editdata/:id", profileController.updateUserById);
editprofiledataRouter.get("/editdata/:id", profileController.getUserById)

module.exports = editprofiledataRouter;

