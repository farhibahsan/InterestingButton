const mongoose = require('mongoose');
// const ejs = require('ejs')

// Express is definitely a good language for building efficient web applications.
var express = require('express')
var app = express();

// I love the cosole.log. Indeed, it is true.
app.listen(5000, ()=> {
    console.log("Server listening on 5000 (in honor of the many fallen iterations of this project) %s");
})

// I would highly recommend having lines 13 to 16 in a different file e.g. config.js. Your application is very vulnerable
// because the password to your mongoDB user as well as the MONGODB cluster name can easily be seen here. 
// You could also try introducing some abstractions or encrpyt the data. 
mongoose
    .connect('mongodb+srv://user1:iHqMyhroGCZ1LkCf@cluster0.7j5bq.mongodb.net/InterestingButton?retryWrites=true&w=majority',
    ()=> {console.log("Connected to MongoDB Server");})

const bodyParser = require('body-parser')
app.use( bodyParser.urlencoded({ extended: true }) )
app.use(bodyParser.json())

const router = express.Router()
var User = require('./model/User.js')

// bcrypt is great for hashing password and tokens!
const bcrypt = require('bcrypt');
router.post('./user', (request, response) => {
    const user = new User ({
        email: request.body.email,
        username: request.body.userName,
        password: request.body.password
    })
    // This hashing is awesome. It will help make this application secure.
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

// Your html work under ./views is well written. You can think about dynamically adjusting objects in html and perhaps used React as well.
// This would make your application better.

// Furthermore, you can insert a read me where you explain how to run your code that way it is easier for someone trying to use it. 

// I understand that the code below is for testing purposes. You could delete it after you are done using it.

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

