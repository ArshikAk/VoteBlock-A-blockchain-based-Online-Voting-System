const express = require("express")
const router = express.Router()

const { addCandidate, castVote, blockChainCandidateListUpdater, hasVoted, getResults, getEncryptedVotes, getVoteCount } = require("../controllers/blockChainController")

router.post("/addCandidate",addCandidate)
router.post("/castVote",castVote)
router.post("/blockChainCandidateListUpdater",blockChainCandidateListUpdater)
router.post("/hasVoted",hasVoted)

router.get("/getResults",getResults)
router.get("/getEncryptedVotes",getEncryptedVotes)
router.get("/getVoteCount",getVoteCount)


module.exports = router