const { default: mongoose } = require("mongoose");


const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        min : 10,
        max : 106
    },
    password : {
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('User', userSchema);