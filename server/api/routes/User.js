const {userSignup,userLogin,userDetail, userLogout} = require('../controller/User');
const userLogged = require('../middlewares/userLogged')
const Router = require('express').Router();

Router.post('/',userLogged,userDetail);
Router.post('/signup',userSignup);
Router.post('/login',userLogin);
Router.get('/logout',userLogged, userLogout);

module.exports = Router;