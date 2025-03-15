const userModel = require("../models/userSchema")
const candidateModel = require("../models/candidateSchema")

exports.getDashBoardData = async (req,res) => {
    try {
        const data = {}
        const totalVoters = await userModel.countDocuments()
        const totalCandidates = await candidateModel.countDocuments()

        data["totalVoters"] = totalVoters
        data["totalCandidates"] = totalCandidates

        res.status(200).json(data)
    }
    catch {
        res.status(500).json({message: "Internal Server Error"})
    }
}
