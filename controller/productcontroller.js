const productmodel = require("../model/productmodel")

const createProduct = async (req , res) => {
    try {
        const newdata = productmodel({
            name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            category: req.body.category,
            primage: req.file.filename,
        })
        const savedata = await newdata.save()
        if(savedata){
            res.send(savedata)
        }
    } catch (error) {
        res.status(500).send("error console")
    }
}




const readProduct = async(req ,res)=>{
    const {category} = req.body  || {}
    let filterdata = {}

    if(category){
        filterdata = {category}
    }
    const getdata = await productmodel.find(filterdata)
    if(getdata){
        res.send(getdata)
    }
}

const updateProduct = async (req , res) => {
    try {
        const putdata = await productmodel.updateOne(
            {_id : req.params.id},
            {
            $set:{ name: req.body.name,
            quantity: req.body.quantity,
            price: req.body.price,
            category: req.body.category,
            primage: req.file ? req.file.filename : undefined
        }
            }
        )
    
        if(putdata){
            res.send("sucess update")
        }
    } catch (error) {
        res.status(500).send("error console")
    }
}


const readsingleProduct = async(req ,res)=>{
    const getsingledata = await productmodel.findById(req.params.id)
    if(getsingledata){
        res.send(getsingledata)
    }
}

const deleteProduct = async (req ,res) =>{
    const removedata = await productmodel.deleteOne({_id: req.params.id})
    if(removedata){
        res.send("secess delete")
    }
}

const getalldocs = async (req,res)=>{
    const getAlldoc= await productmodel.find()
    if(getAlldoc){
        res.send({getAlldoc})
    }
}




module.exports = {createProduct,readProduct,updateProduct,deleteProduct,readsingleProduct,getalldocs}