const adminmodel = require("../model/adminModel")
const bycrpt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const createAdmin = async(req ,res)=>{
    try {
        const {name ,email , phone , address , password} = req.body

        //check email 
        const checkemail = await  adminmodel.findOne({email})
        if(checkemail){
         return res.status(500).send({error :"email added before"})
        }

        // hash password

        const hashpassword = await bycrpt.hash(password, 10)


        const newdata = await adminmodel({
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

const adminlogin = async(req ,res)=>{
    try {
        const  {email , password} = req.body

        //email check

         const checkemail = await  adminmodel.findOne({email})
        if(!checkemail){
          return res.status(500).send({error :"email are invalid "})
        }

        const checkpassword = await bycrpt.compare(password , checkemail.password)

        if(!checkpassword){
         return res.status(500).send({error :"password are invalid "})
        }

        const token = jwt.sign(
            {id: checkemail._id ,name:checkemail.name, email:checkemail.email ,role: checkemail.role},
            process.env.JWT_Secret,
            {expiresIn: "7d"}
        )

        res.send({
            message: "success Login",
            admin: {
                name: checkemail.name,
                email:checkemail.email,
                role:checkemail.role
            },
            token
        })


    } catch (error) {
         console.log(error)
      return  res.status(400).json({error : "error server"})
    }
}




module.exports = {createAdmin,adminlogin,}