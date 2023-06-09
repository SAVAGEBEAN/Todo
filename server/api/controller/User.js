const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userValidation = require('../validation/userValidation');


const userSignup = async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    //validating input values !yet to be checked
    const {value,error} = userValidation(req.body);
    if(error) return res.status(400).send(value);

    //checking if email already present
    if(await User.findOne({email:email})) return res.send('Email Already present');

    //hashing password
    const hash = await bcrypt.hash(password,10);
    const user = new User({
        email : email,
        password : hash
    })
    
    try{
        //saving user to database
        const saved = await user.save();
    res.send({user : saved._id});
    }
    catch(error){
        res.send(error);
    }
}
const userLogin = async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    //checking email
    const findEmail = await User.findOne({email:email});
    if(!findEmail) return res.send('Invalid Email');
    
    //validating password
    const validPass = await bcrypt.compare(password,findEmail.password);
    if(!validPass) return res.status(400).send('Invalid Password');


    //creating token
    const token = jwt.sign({_id : findEmail._id}, process.env.TOKEN_SECRET);
    
    //setting token in cookies
    // res.cookie('user-token',token,{
    //     httpOnly : true,
    //     maxAge : 8*60*60*1000
    // });
    res.send(token);
    
};
const userDetail = async(req,res)=>{
    res.send(req.user);
};
const userLogout = async(req,res)=>{
    //removing user login token from cookies
    res.cookie('user-token','',{
        maxAge : 0
    })
    res.send('Logout Successfuly')
}
module.exports = {
    userSignup,
    userLogin,
    userDetail,
    userLogout
};