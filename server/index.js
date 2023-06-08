
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./api/routes/User');
const TodoRoute = require('./api/routes/TodoRoute')
const cors = require('cors');

require('dotenv/config')

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true});
const db = mongoose.connection;

db.once('open',()=>{console.log('DB connected')});
db.on('error', (error)=>{console.log(error)})

app.use(cors());
app.use(express.urlencoded());
app.use(express.json())
app.use('/user',User);
app.use('/todo',TodoRoute);

app.listen(5000,()=>{
    console.log('Server started');
})