const express = require("express");
const contactcontroller = require("../controller/contact.controller")
const router = express.Router();

router.post("/create/contact",contactcontroller.createcontact);
router.get("/read/contact",contactcontroller.readcontact);
router.delete("/delete/contact/:id",contactcontroller.deletecontact);

module.exports = router;
