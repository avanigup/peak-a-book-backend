const express = require('express')
const router = express.Router()
const UserPostsModel = require('../models/UserPostsModel')

//a POST route for sharing a UserPost
router.post(
    '/',
    (req, res) => {
        const formData = {
            text: req.body.text,
            username: req.body.username,
            hashtags: req.body.hashtags
        }
        console.log('From the user:',formData)

        //save the entered data to the database (feeds collection)
        const newPostModel = new UserPostsModel(formData)
        newPostModel.save()

        res.send("Your POST request has been received")
    }
)

//a GET route for fetching a UserPost
router.get(
    '/',
    (req,res)=>{
        UserPostsModel
            //fetch all the documents using .find()
            .find()
            //once the results have been fetched, use .json() to send the result
            .then(
                (results)=>{
                    //res.json = res.send() + converts to json
                    res.json(results)
                }
            )
            .catch(
                (e)=>{
                    console.log("error",e)
                }
            )
    }
)

module.exports = router