const mongoose = require("mongoose")


const adminschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
     email: {
        type: String,
        required: true
    },
     password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["admin","user"],
        default: "user"
    }
},{ timestamps: true }
)


module.exports = mongoose.model("admin" ,adminschema)