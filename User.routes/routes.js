const express = require("express");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserRouter = express.Router();

UserRouter.get("/", (req, res) => {
  res.send("welcome to home");
});

UserRouter.post("/register", async (req, res) => {
  const { fname,lname, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "Email already exists" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const newUser = new UserModel({fname,lname,email,password:hash});
        await newUser.save();
        res.status(200).json({ msg: "New user has been registered" });
      });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { autherID: user._id, auther: user.name },
            "masai"
          );
          res.status(200).json({ msg: "Login successful !!", token: token });
        } else {
          res.status(400).json({ msg: "Password Mismatch !!" });
        }
      });
    } else {
      res.status(400).json({ msg: "Please create an account first !!" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = { UserRouter };




















// const express = require ("express");

// const  {UserModel} = require("../model/user.model")
// const jwt = require('jsonwebtoken')

// const bcrypt = require("bcrypt")

// const UserRouter = express.Router();

// UserRouter.get("/",(req,res)=>{
//     res.send("welcome to home")
// })


// UserRouter.post("/register",async(req,res)=>{
//     // logic
// const {name, email, password,age}=req.body
//     try {

//         bcrypt.hash(password, 5,async(err, hash)=> {
            
//             const user = new UserModel({name, email, password:hash,age})
//             await user.save()
//     res.status(200).json({"msg":"New user has been registered"})
//         });


       

//     } catch (error) {
//         res.status(400).json({"msg":err.message})
//     }
// })



// UserRouter.post("/login",async(req,res)=>{
//     // logic

//     const {email,password} = req.body

//     try {

       
//         const user =await UserModel.findOne({email})
//         if(user){
//             bcrypt.compare(password, user.password,(err, result)=> {
               
//                 if(result){
//                     const token = jwt.sign({autherID:user._id,auther:user.name}, 'masai');
//                     res.status(200).json({"msg":"Login sucesseful","token":token})

//                 }

//                 else{
//                     res.status(200).json({"msg": "wrong credentials"})
//                 }
//             });

          
//         }
//         else{
//             res.status(200).json({"msg": "wrong credentials"})
//         }
//     } catch (error) {
//         res.status(400).json({"msg":err.message})
//     }

// })


// module.exports = {UserRouter}