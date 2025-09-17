const express = require("express");
const router = express.Router();

const ordersController = require("../controller/orderscontroller");

router.post("/create/order", ordersController.createOrder);
router.get("/read/order", ordersController.readOrders);
router.get("/getincome/order", ordersController.getTotalIncome);
router.get("/gettopcustomer/order", ordersController.getTopCustomer);

module.exports = router;
