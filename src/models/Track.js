const mongoose = require("mongoose")

const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
})


const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, //type is a schema
        ref: "User" //pointing to model schema
    },
    name: {
        type: String,
        default: ""
    },
    locations: [pointSchema],
    category: {
        type: String,
    },
    startingLocation: {
        type: String
    }
})

mongoose.model("Track", trackSchema)