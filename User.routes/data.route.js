const express = require("express")

const dataRouter = express.Router();

const {DataModel} = require("../model/data.model")


dataRouter.get("/wel",(req,res)=>{
    res.send("this is data page")
})

dataRouter.get("/pro",async(req,res)=>{
    const query  = req.query
    try {
        const products= await DataModel.find({query})
    
        res.send(products)
    } catch (err) {
        res.status(400).send({"err":err.message})
    }
})




dataRouter.post("/create", async (req,res)=>{
    try {
       await DataModel.insertMany(req.body)
        res.status(200).send({"msg":"New product has been added"})
    } catch (err) {
        res.status(400).send({"err":err.message})
    }

})



dataRouter.get("/",async(req,res)=>{
// const que = req.query
try {
    const product= await DataModel.find({autherID:req.body.autherID})

    res.send(product)
} catch (err) {
    res.status(400).send({"err":err.message})
}
})



dataRouter.patch("/update/:noteID", async(req,res)=>{
const {noteID} = req.params
const note = await DataModel.findOne({_id:noteID})
try {
    if(req.body.autherID!==note.autherID){
        res.status(200).send({"msg":`You are not authorised to do this action`})
    }
    else{
        await DataModel.findByIdAndUpdate({_id:noteID},req.body)

        res.status(200).send({"msg":`The note with id:${noteID} has been updated`})
    }

   } catch (err) {
    res.status(400).send({"err":err.message})
}
})



dataRouter.delete("/delete/:noteID", async(req,res)=>{
const {noteID} = req.params
const note = await DataModel.findOne({_id:noteID})
try {
    if(req.body.autherID!==note.autherID){
        res.status(200).send({"msg":`You are not authorised to do this action`})
    }
    else{
        await DataModel.findByIdAndDelete({_id:noteID})
        res.status(200).send({"msg":`the note with id:${noteID} has been deleted`})
    }
   } catch (err) {
    res.status(400).send({"err":err.message})
}
})



module.exports = {dataRouter}
