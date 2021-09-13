const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    userName: { type: String, unique: true,required: true },
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', userSchema)

// This schema is well made. Does unique ensure that the username entered is a new username?
// There is a better way to check this by making a authenticatin and validation file. 
// These files check for empty parameters as well as query the database to get existing users. You can lookin into this next time.
// This idea is similar ot my validation.js file.