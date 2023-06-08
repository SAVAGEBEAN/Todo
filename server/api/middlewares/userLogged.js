const jwt = require('jsonwebtoken');
const User = require('../models/user');
const userLogged = (req,res,next)=>{

    //checking if cookie is present;
    if(!req.body.user) return res.status(401).send('Token Expired');
    const token = req.body.user;
    // console.log('my toke'+token);

    //verification of present token
    jwt.verify(token, process.env.TOKEN_SECRET, async(err,decoded)=>{
        if(err) return console.log(err);
        if(await User.findOne({_id:decoded._id})) next();
    })
}

module.exports = userLogged;