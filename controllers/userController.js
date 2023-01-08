import userModel from '../modules/User.js'
import bcrypt from 'bcrypt'
class userController {
    static home = (req, res) => {
        res.render("index")
    }
    static registration = (req, res) => {
        res.render("registration")
    }


    // static createUserDoc = async (req, res) => {
    //     try{
    //         // Creating new document using model 
    //         const doc = userModel({
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: req.body.password,
    //         })
    //         // Saving document
    //         const result = await doc.save()
    //         res.redirect("/login")
    //     } catch(err){
    //         console.log(err)
    //     }
    // }

    static createUserDoc = async (req, res) => {
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        try{
            // Creating new document using model 
            const doc = userModel({
                name: req.body.name,
                email: req.body.email,
                password: hashPassword
            })
            // Saving document
            const result = await doc.save()
            res.redirect("/login")
        } catch(err){
            console.log(err)
        }
    }


    static login = (req, res) => {
        res.render("login")
    }


    // static verifyLogin = async (req, res) => {
    //     try {
    //         const {email, password} = req.body
    //          const result = await userModel.findOne({email: email})
    //          if(result!=null){
    //             if(result.email == email && result.password == password){
    //                 res.send(`<h1>Dashboard...${result}</h1>`)
    //              }else{
    //                 res.send("<h1>Invaid Credentials</h1>")
    //              }
    //          } else{
    //             res.send("<h1>You're not a registered user</h1>")
    //          }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

     static verifyLogin = async (req, res) => {
        try {
            const {email, password} = req.body
             const result = await userModel.findOne({email: email})
             if(result!=null){
                const isMatch = await bcrypt.compare(password, result.password)
                if(result.email == email && isMatch){
                    res.send(`<h1>Dashboard...${result}</h1>`)
                 }else{
                    res.send("<h1>Invaid Credentials</h1>")
                 }
             } else{
                res.send("<h1>You're not a registered user</h1>")
             }
        } catch (error) {
            console.log(error)
        }
    }
}

export default userController