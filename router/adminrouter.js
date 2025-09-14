const express = require("express")
const admincontroler = require("../controller/admincontroller")


const router = express.Router()

router.post("/create/admin",admincontroler.createAdmin)
router.post("/login/admin",admincontroler.adminlogin)



module.exports = router