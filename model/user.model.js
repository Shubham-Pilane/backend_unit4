const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    fname:{type:String,require:true},
    lname:{type:String,require:true},
     email:{type:String,require:true},
    password:{type:String,require:true}  
},{
    versionKey:false
})

const UserModel = mongoose.model("user",userSchema)

module.exports = {UserModel}

// {
//     "fname": "suraj",
//     "lname": "king",
//     "email": "suraj@gmail.com",
//     "password": "suraj"
//     
// }