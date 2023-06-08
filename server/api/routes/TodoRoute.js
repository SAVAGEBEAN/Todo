const Router = require('express').Router();
const { createTask, allTask, updateTask, deleteTask, getTask, searchTask } = require('../controller/Todo');
const userLogged = require('../middlewares/userLogged');

Router.post('/alltask',userLogged,allTask);
Router.post('/create',userLogged,createTask);
Router.post('/task',userLogged,getTask);
Router.post('/search',userLogged,searchTask);
Router.post('/update',userLogged,updateTask);
Router.post('/delete',userLogged,deleteTask);

module.exports = Router;