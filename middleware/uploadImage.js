const multer = require("multer") 

const storeimage = multer.diskStorage({
    destination: (res , file ,cb)=>{
        cb(null , "document")
    },
    filename: (req ,file ,cb)=>{
        cb(null , file.originalname)
    }
})


const uploadimage = multer({
    storage : storeimage
})

module.exports = uploadimage