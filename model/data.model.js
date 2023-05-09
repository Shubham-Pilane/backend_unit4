const mongoose = require("mongoose");


const dataSchema = mongoose.Schema({
  
    name:{type:String},
    image1:{type:String},
    discountPriceInr:{type:Number},
   category:{type:String},
   description:{type:String},
   rating:{type:Number},


},{
    versionKey:false
})

const DataModel = mongoose.model("data",dataSchema)

module.exports = {DataModel}