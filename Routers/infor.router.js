const express = require("express");
const router = express.Router();
const controller = require('../Controllers/infor.controllers')
// var validate = require('../validations/user.validation')
 
// create application/x-www-form-urlencoded parser
router.get("/", controller.information);
router.post("/",controller.postInformation);
module.exports = router;