const express = require("express")
const router = express.Router()

const { getUser , getCandidateList } = require("../controllers/userController")

router.get("/getUserData/:id",getUser)
router.get("/getCandidateData/",getCandidateList)


module.exports = router