const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const User = mongoose.model("User")


module.exports = (req, res, next) => {
    const { authorization } = req.headers
    //authorization === "Bearer laksjkhdgjksgsjdkgsjkdg"

    //if no authorization sent with headers
    if (!authorization) {
        return res.status(401).send({ error: "You must be logged in!" })
    }

    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, "MY_SECRET_KEY", async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: "You must be logged in." })
        }

        const { userId } = payload
        const user = await User.findById(userId)

        //add to middleware req object for other middleware
        req.user = user

        next()
    })
}