const express = require("express")
const router = express.Router()

const { addCandidate, castVote, getBlockChainCandidates } = require("../controllers/blockChainController")

router.post("/addCandidate",addCandidate)
router.post("/castVote",castVote)
router.get("/getBlockChainCandidates",getBlockChainCandidates)


module.exports = router