const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { response } = require("express")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//function that runs before saving
//function not arrow syntax to make use of this syntax for new user
//always salt and hash password before saving
userSchema.pre("save", function (next) {
    const user = this
    if (!user.isModified("password")) {
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }

            user.password = hash
            next()
        })
    })
})

//what user trying to login with
// method that compares password provided by user with one stored
userSchema.methods.comparePassword = function (candidatePassword) {

    const user = this

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err)
            }

            if (!isMatch) {
                return reject(false)
            }
            resolve(true)
        })
    })
}

mongoose.model("User", userSchema)