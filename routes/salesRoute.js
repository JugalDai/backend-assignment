const express=require('express');
const router=express.Router();
const Mysales= require('../models/salesModel');
const User=require('../models/userModel');
const auth=require('../middleware/auth')



router.route('/')
.get(auth.verifyUser,(req,res,next)=>
{
    User.findById(req.user.userId).then(user=>{
        if(user.sales.length==0){
            Mysales.create({userId:`${req.user.userId}`,product:[]}).then(mysales=>{
                user.sales.push(mysales._id)
                        user.save().then(user=>{
                res.json(mysales);
                }).catch(err=>next(err))
            }).catch(err=>next(err));
                 }else{
            Mysales.findById(user.sales[0]).then(mysales=>{
                res.json(mysales);
            })
        }
    }).catch(err=>next(err))
   
})



module.exports=router;