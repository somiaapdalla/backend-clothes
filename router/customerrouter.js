const express = require("express")
const customercontroller = require("../controller/customercontroller")
const { verify } = require("jsonwebtoken")
const { verifyToken, isAdmin } = require("../middleware/auth")


const router = express.Router()

router.post("/create/customer",customercontroller.createcustomer)
router.post("/login/customer",customercontroller.customerlogin)
router.get("/read/customer", verifyToken, isAdmin,  customercontroller.readcustomer)
router.delete("/delete/customer/:id",customercontroller.deletecustomer)


module.exports = router