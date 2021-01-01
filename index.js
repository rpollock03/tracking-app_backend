require("./src/models/User")
require("./src/models/Track")
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const authRoutes = require("./src/routes/authRoutes")
const trackRoutes = require("./src/routes/trackRoutes")
const requireAuth = require("./src/middlewares/requireAuth")


const app = express();


//middleware. bodyParser first otherwise authroutes wont get parsed!
// all parsed information associated with req object in other middleware
app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0.kfozc.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongo instance")
})
mongoose.connection.on("error", (err) => {
    console.error("error connecting to mongo", err)
})


app.get("/", requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
})

app.listen(3000, () => {
    console.log("Listening on port 3000")
})