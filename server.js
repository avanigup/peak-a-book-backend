//importing express module inside your server
const express = require('express');
//importing mongoose
const mongoose = require('mongoose')
//importing body-parser
const bodyParser = require('body-parser')
//import dotenv
require('dotenv').config()
//import passport
const passport = require('passport')

//import the strategies
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const secret = process.env.SECRET

//import cors
const cors = require('cors')

const UsersModel = require('./models/UsersModel')

const passportJwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
}

const passportJwt = (passport)=>{
    passport.use(
        new JwtStrategy(
            passportJwtOptions,
            (jwtPayload, done)=>{
                //extract and find the user by their id (contained jwt)
                UsersModel.findOne({_id:jwtPayload.id})
                .then(
                    //if document was found
                    (document)=>{
                        return done(null, document)
                    }
                )
                .catch(
                    //if something went wrong with db search
                    (err)=>{
                        return done(null, null)
                    }
                )
            }
        )
    )
}

//import routes
const UsersRoutes = require('./routes/UsersRoutes')
const UserPostsRoutes = require('./routes/UserPostsRoutes')

//create the server object
const server = express();

//configure express to use body-parser
server.use(bodyParser.urlencoded({extended:false}))
server.use(bodyParser.json())
//use passport
server.use(passport.initialize())
server.use(cors())

//invoke passportJwt and pass passport as argument
passportJwt(passport)

const dbURL = process.env.DB_URL

//mongoose connects to the mongoDB through the URL, then, when connection is complete, we want to display the message on console
mongoose.connect(
    dbURL, 
    {
        'useNewUrlParser':true,
        'useUnifiedTopology':true
    }
).then(
    ()=> {
        console.log("You are connected to mongoDB")
    }
).catch(
    (e)=> {
        console.log("catch",e)
    }
)


//route for feeds page
// server.use(
//     '/feeds',
//     passport.authenticate('jwt',{session:false}),
//     FeedsRoutes
// )

//route for users page
 server.use(
     '/users',
     UsersRoutes
 )

 //route for user posts 
 server.use(
     '/feed',
     UserPostsRoutes
 )

// //route for emails page
// server.use(
//     '/emails',
//     EmailsRoutes
// )

//create a route for the landing page
server.get(
    '/',
    (req, res) => {
        res.send("<h1>Welcome to Peak-a-book</h1>")
    }
);

//create a route for 404 page
server.get(
    '*',
    (req,res) => {
        res.send("<h1>404</h1><p>Error page. Oops!</p>")
    }
)

//connect to port (range 3000 to 9999)
//my computer/server is http://127.0.0.1 aka http://localhost
server.listen(
     8090, ()=> {
        console.log("You are connected to http://127.0.0.1:8090")
    }
) 