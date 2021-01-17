const express = require("express")
const mongoose = require("mongoose")
const requireAuth = require("../middlewares/requireAuth")

const Track = mongoose.model("Track")

const router = express.Router();

//everything in this file will go through requireAuth middleware.
router.use(requireAuth)

router.get("/tracks", async (req, res) => {
    const tracks = await Track.find({ userId: req.user._id })
    res.send(tracks)
})

router.post("/tracks", async (req, res) => {
    const { name, locations, category, startingLocation } = req.body

    if (!name || !locations) {
        return res.status(422).send({ error: "You must provide a name and locations" })
    }
    try {
        const track = new Track({ name, locations, userId: req.user._id, category, startingLocation })
        await track.save()
        res.send(track)
    } catch (err) {
        res.status(422).send({ error: err.message })
    }
})

router.delete("/tracks", async (req, res) => {
    const { id } = req.body
    console.log("you are tryng to delete", id)
    if (!id) {
        return res.status(422).send({ error: "No track id provided to delete!" })
    }
    try {
        const result = await Track.deleteOne({ _id: id })
    } catch (err) {
        return res.status(422).send({ error: "Problem deleting track!" })
    }


    return res.send("deleted!")

})

module.exports = router