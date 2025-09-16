const express = require("express")
const ordercontroller = require("../controller/ordercontroller")


const router = express.Router()
router.post("/create/order",ordercontroller.createOrder)
router.get("/read/order",ordercontroller.readOrder)
router.get("/getincome/order",ordercontroller.getTotalIncome)
router.get("/gettopcustomer/order",ordercontroller.getTopCustomer)




module.exports = router