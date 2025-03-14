const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()


const app = express()

app.use(express.json())
app.use(cors({
    origin: "*",
    credentials : true
}))

mongoose.connect(process.env.MONGO_DB_URL)
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT,() => {
        console.log("Server is running on port " + process.env.PORT)
    })
})


app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/user", require("./routes/userRoutes"))
app.use("/api/blockchain", require("./routes/blockChainRoutes"))
app.use("/api/admin", require("./routes/adminRoutes"))