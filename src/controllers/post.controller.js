const express = require("express")

const router = express.Router()

const authenticate = require("../middleware/authenticate")

const Post = require("../models/post.model")

router.post("",authenticate,async(req,res)=>{
    try{
        const post = await Post.create({
            title:req.body.title,
            body:req.body.body,
            user:req.user._id
        })

        return res.status(201).send(post)
    } catch(err){
        return res.status(501).send({Error:err.message})
    }
})
router.put("/:id",authenticate,async(req,res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.id,req.body,{
            new:true
        }).lean().exec()

        return res.status(201).send(post)

    } catch(err){
        return res.status(501).send({Error:err.message})
    }
})
router.delete("/:id",authenticate,async(req,res)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id)

        return res.status(201).send(post)
    } catch(err){

        return res.status(501).send({Error:err.message})
    }
})
router.get("/:id",async(req,res)=>{
    try{
        const post = await Post.findOne({_id:req.params.id}).populate({path:"user"})

        return res.status(201).send(post)
        
    } catch(err){
        return res.status(501).send({Error:err.message})
    }
})

router.get("",async(req,res)=>{
    try{
        const post = await Post.find(req.params.id).populate({path:"user"}).lean().exec()

        return res.status(201).send(post)
    } catch(err){
        return res.status(501).send({Error:err.message})
    }
})

module.exports = router;