const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

const UsersModel = mongoose.model('peak_a_book_users', UsersSchema)
module.exports = UsersModel