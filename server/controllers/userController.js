const UserSchema = require("../models/userSchema")
const candidateModel = require("../models/candidateSchema")

exports.getUser = async (req,res) => {
    try {
        const {id} = req.params
        const user = await UserSchema.findOne({epicId : id})
        if(!user) 
            return res.status(404).json({message : "User not found"})
        res.json(user)
    }
    catch (err) {
        console.log(err)
    }
}


exports.getCandidateList = async (req,res) => {
    try {
        const candidates = await candidateModel.find()
        res.json(candidates)
    }
    catch {
        console.log(err)
    }
}