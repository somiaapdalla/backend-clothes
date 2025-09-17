const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const productrouter = require("./router/productrouter")
const customerrouter = require("./router/customerrouter")
const orderrouter = require("./router/orderRouter")
const adminrouter = require("./router/adminrouter")
const contactrouter = require("./router/contactrouter")
const ordersrouter = require("./router/ordersrouter")
// const clothesrouter = require("./router/outfitrouter")

const app = express()
const cors = require("cors");

app.use(cors())
app.use(express.json())
app.use("/allDocs", express.static("document")) //
const PORT = process.env.port || 1000

mongoose.connect(process.env.mongodb_url).then(()=>{
    console.log("the server is connected")
})

app.use(productrouter)
app.use(customerrouter)
app.use(orderrouter)
app.use(adminrouter)
app.use(contactrouter)
app.use(ordersrouter)
// app.use(clothesrouter)


app.listen(PORT, ()=> console.log(`the server is running on port ${PORT}`))