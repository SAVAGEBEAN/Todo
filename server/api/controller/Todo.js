const Todo = require("../models/todo");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// const getEmail = async (req) => {
//   return (
  //     await User.findById(jwt.verify(req.body.user, process.env.TOKEN_SECRET)._id)
  //   ).email;
  // };
  
  const createTask = async (req, res) => {
  try {
  const {title,description} = req.body;
  const email = req.user;

  const todo = new Todo({
    email,
    title,
    description,
  });

    const saved = await todo.save();
    res.send(saved);
  } catch (error) {
    res.send(error);
  }
};

const allTask = async (req, res) => {
  try {
    const email = req.user;
    res.send(await Todo.find({ email }));
    
  } catch (error) {
    res.json({error:error})
  }
};

const updateTask = async (req, res) => {
  try {
  req.body.title == "" ? delete req.body.title : req.body;
  req.body.description == "" ? delete req.body.description : req.body;
  req.body.status == "" ? delete req.body.status : req.body;
  const id = req.body.todo_id;
  delete req.body.todo_id;

    const update = await Todo.findOneAndUpdate({ _id: id }, req.body);
    res.send(update);
  } catch (error) {
    res.send(error);
  }
};

const getTask = async(req,res)=>{
  try{
    const id = req.body.todo_id;

        const findTask = await Todo.findById({_id:id});
        
        if(!findTask) return res.send('Not Found');
        
        res.send(findTask);
    }
    catch(error){
        res.send(error)
    }
}
const searchTask = async(req,res) =>{
  try{
    const title = req.body.title;
    const email = req.user;
        const getTask = await Todo.find({email:email,title:new RegExp(title,'i')});
        res.send(getTask);
        // console.log(getTask);
    }catch(error){
        res.send(error)
    }
}
const deleteTask = async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.body.id);
    res.send(deleted);
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  createTask,
  allTask,
  updateTask,
  getTask,
  searchTask,
  deleteTask,
};
