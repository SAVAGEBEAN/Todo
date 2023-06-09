const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userLogged = (req,res,next)=>{

    //checking if cookie is present;
    // console.log(req.headers.authtoken)
    if(!req.headers.authtoken) return res.status(401).send('Token Expired');
    const token = req.headers.authtoken;
    // console.log('my toke'+token);

    //verification of present token
    jwt.verify(token, process.env.TOKEN_SECRET, async(err,decoded)=>{
        if(err) return res.json({message:err});
        if(await User.findById({_id:decoded._id})){
            req.user = (await User.findById({_id:decoded._id})).email;
       
            next();
        } 
        else{
            res.json({message:'User not found'})
        }
    })
}

module.exports = userLogged;