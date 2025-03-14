const express = require("express")
const router = express.Router()

const { addCandidate, castVote } = require("../controllers/blockChainController")

router.post("/addCandidate",addCandidate)
router.post("/castVote",castVote)


module.exports = router