const customermodel = require("../model/customermodel")
const bycrpt = require("bcryptjs")


const createcustomer = async(req ,res)=>{
    try {
        const {name ,email , phone , address , password} = req.body

        //check email 
        const checkemail = await  customermodel.findOne({email})
        if(checkemail){
         return res.status(500).send({error :"email added before"})
        }

        // hash password

        const hashpassword = await bycrpt.hash(password, 10)


        const newdata = await customermodel({
            name,
            email,
            phone,
            address,
            password: hashpassword
        })


        const savedata = await newdata.save()
        if(savedata){
            res.send(savedata)
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({error : "error server"})
    }
}

const customerlogin = async(req ,res)=>{
    try {
        const  {email , password} = req.body

        //email check

         const checkemail = await  customermodel.findOne({email})
        if(!checkemail){
          return res.status(500).send({error :"email are invalid "})
        }

        const checkpassword = await bycrpt.compare(password , checkemail.password)

        if(!checkpassword){
         return res.status(500).send({error :"password are invalid "})
        }

        res.send({
            message: "success Login",
            customer: {
                name: checkemail.name,
                email:checkemail.email,
                phone: checkemail.phone,
                address: checkemail.address
            }
        })


    } catch (error) {
         console.log(error)
      return  res.status(400).json({error : "error server"})
    }
}


const readcustomer = async (req ,res)=>{
    const getcustomer = await customermodel.find()
    if(getcustomer){
        res.send(getcustomer)
    }
}

const deletecustomer = async (req ,res) =>{
    const removedata = await customermodel.deleteOne({_id: req.params.id})
    if(removedata){
        res.send("secess delete")
    }
}

module.exports = {createcustomer,customerlogin,readcustomer,deletecustomer}