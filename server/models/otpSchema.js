const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
    epicId : {
        type: String,
        required : true
    },
    otp : {
        type : Number,
        required : true
    },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 300 
    },
})

const otpModel = mongoose.model("otp",otpSchema)

module.exports = otpModel