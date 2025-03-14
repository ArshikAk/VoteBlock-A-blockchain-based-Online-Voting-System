const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
    },
  epicId: { 
    type: String, 
    unique: true, 
    required: true 
    },
  gender: { 
    type: String, 
    enum: ["Male", "Female", "Other"], 
    required: true 
    },
  dob: { 
    type: String, 
    required: true 
    },
  relativeName: { 
    type: String, 
    required: true 
    },
  state: { 
    type: String, 
    required: true 
    },
  district: {
    no: { type: Number, required: true },
    name: { type: String, required: true },
  },
  constituency: {
    no: { type: Number, required: true },
    name: { type: String, required: true },
  },
  pollingStation: { 
    type: String, 
    required: true 
    },
  partSerialNumber: { 
    type: Number, 
    required: true 
    },
  partNumber: { 
    type: Number, 
    required: true 
    },
    profilePic : {
        type: String,
        required: true
    },
    phoneNumber : {
        type: Number,
        required: true
    }
});

const userModel =  mongoose.model("User", UserSchema)

module.exports = userModel;
