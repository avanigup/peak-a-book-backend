//import mongoose package
const mongoose = require('mongoose')

const UserPostsSchema = new mongoose.Schema(
    {
        text:
        {
            type: String,
            required: true
        },
        username:
        {
            type: String,
            required: true
        },
        hashtags:
        {
            type: Array
        },
        likes:
        {
            type:Array
        },
        image:
        {
            type: String
        },
        date:
        {
            type: Date,
            default: Date.now()
        }
    }
)
const UserPostsModel = mongoose.model('peak_a_book_user_posts', UserPostsSchema)
module.exports = UserPostsModel