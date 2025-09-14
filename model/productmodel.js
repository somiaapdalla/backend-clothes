const mongoose = require("mongoose")
const { type } = require("os")



const productschema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
     quantity: {
        type: Number,
        required : true
    },
     price: {
        type: Number,
        required : true
    },
     primage: {
        type: String,
        required : true
    },
     status: {
        type: String,
        enum: ["avariable" , "aut of store"],
        default: "avariable" 
    },
    category: {
        type: String,
        required: true
    }
})

// middleware
productschema.pre("save" ,function (next){
    this.status = this.quantity > 0 ? "avariable" : "aut of store"
    next()
} )


productschema.pre("updateOne", function (next) {
  const update = this.getUpdate();

 
  const quantity = update.$set?.quantity;

  if (quantity !== undefined) {
    update.$set.status = quantity > 0 ? "available" : "out of stock";
    this.setUpdate(update);
  }

  next();
});

module.exports = mongoose.model("product",productschema)