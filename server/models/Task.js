const mongoose = require('mongoose')
const User = require('./User')

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true

    },

    status : {
        type : String,
        enum : ["completed","pending"],
        default : "pending"
        
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        required : true
    },
},
{
    timestamps : true
})

const Task = mongoose.model("Task", taskSchema)

module.exports = Task