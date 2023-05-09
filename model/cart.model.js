const mongoose = require("mongoose");


const cartSchema = mongoose.Schema({
  
    name:{type:String},
    image1:{type:String},
    discountPriceInr:{type:Number},
   category:{type:String},
   description:{type:String},
   rating:{type:Number},

},{
    versionKey:false
})

const CartModel = mongoose.model("cart",cartSchema)

module.exports = {CartModel}