const mongoose = require("mongoose")

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    party : {
        type: String,
        required: true,
    },
    logo : {
        type: String,
        required: true,
    },
    about : {
        type: String,
        required : true,
    },
    policies : {
        type: String,
        required : true,
    }
})

const candidateModel = mongoose.model("candidates",candidateSchema)

module.exports = candidateModel