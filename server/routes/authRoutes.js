const express = require("express")
const router = express.Router()

const { sendOTP, verifyOTP, verifyVoterID } = require("../controllers/authController")

router.post("/sendOTP",sendOTP)
router.post("/verifyOTP",verifyOTP)
router.post("/verifyVoterID",verifyVoterID)

module.exports = router