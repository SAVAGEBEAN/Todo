const { default: mongoose } = require("mongoose");

const todoSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
        min : 3,
        max : 106
    },
    description : {
        type : String,
        required : true,
        min : 6,
        max : 8196
    },
    status : {
        type : String,
        required : true,
        default : 'Pending'
    },
    date : {
        type : Date,
        default : Date.now()
    }
});
module.exports = mongoose.model('Todo', todoSchema);