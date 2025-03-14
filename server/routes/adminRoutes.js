const express = require("express")
const router = express.Router()

const { getDashBoardData } = require("../controllers/adminControllers")

router.get("/getDashBoardData",getDashBoardData)


module.exports = router