const express = require("express")
const productcontroller = require("../controller/productcontroller")
const uploadImage = require ("../middleware/uploadImage")

const router = express.Router()


router.post("/create/product",uploadImage.single("img") , productcontroller.createProduct)
router.post("/read/product", productcontroller.readProduct)
router.get("/read/product", productcontroller.readProduct)
router.get("/getalldocs/product", productcontroller.readProduct)
router.get("/read/singleproduct/:id", productcontroller.readsingleProduct)
router.put("/update/product/:id",uploadImage.single("img") , productcontroller.updateProduct)
router.delete("/delete/product/:id",uploadImage.single("img") , productcontroller.deleteProduct)


module.exports = router