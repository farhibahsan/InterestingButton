const mongoose = require('mongoose');
// const ejs = require('ejs')

var express = require('express')
var app = express();

app.listen(5000, ()=> {
    console.log("Server listening on 5000 (in honor of the many fallen iterations of this project) %s");
})

mongoose
    .connect('mongodb+srv://user1:iHqMyhroGCZ1LkCf@cluster0.7j5bq.mongodb.net/InterestingButton?retryWrites=true&w=majority',
    ()=> {console.log("Connected to MongoDB Server");})

const bodyParser = require('body-parser')
app.use( bodyParser.urlencoded({ extended: true }) )
app.use(bodyParser.json())

const router = express.Router()
var User = require('./model/User.js')
const bcrypt = require('bcrypt');
router.post('./user', (request, response) => {
    const user = new User ({
        email: request.body.email,
        username: request.body.userName,
        password: request.body.password
    })

    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err)
        }

        user.password = hash
        user.save().then(data => {
            console.log("Successfully created new User")
        }).catch(error=> {
            throw new Error(error)
        })
    })
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/signup.html')
})

module.exports = router

app.use('/images', express.static(__dirname + '/images'))
app.use('/css', express.static(__dirname + '/css'))
app.use('/fonts', express.static(__dirname + '/fonts'))

// app.set('view engine', 'ejs')
// router.get('/users', (request, response) => {
//     User.find({}, (error, result) => {
//         if (result) {
//             response.render('availableUsers', {'users' : result})
//         } else { 
//             response.status(404)
//         }
//     })
// })
// var LocalStrategy = require('passport-local').Strategy;
// const passport = require('passport')
// app.use(passport.initialize())
// app.use(passport.session())
// passport.use(new LocalStrategy(
//     { usernameField: 'username' },
//     (userName, password, done) => {
//         User.findOne({userName: userName}, (err, userData) => {
//             let passwordCheck = bcrypt.compareSync(password, userData.password)
//             if (userName === userData.userName && passwordCheck) {
//                 return done(null, userData)
//             }
//         })
//     }
// ))

// app.post('/login', (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         req.login(user, (err) => {
//             // Redirect placeholder
//             res.redirect('/login.html')
//         })
//     }) (req, res, next)
// })

