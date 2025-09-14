const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const productrouter = require("./router/productrouter")
const customerrouter = require("./router/customerrouter")
const orderrouter = require("./router/orderRouter")
const adminrouter = require("./router/adminrouter")

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


app.listen(PORT, ()=> console.log(`the server is running on port ${PORT}`))