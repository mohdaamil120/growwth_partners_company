const express = require("express")
const cors = require("cors")
const { connection } = require("./db")
const ChatRouter = require("./routes/chatRoute")
const uploadRouter = require("./routes/uploadRoute")
require("dotenv").config()

const PORT = process.env.PORT || 8080
const app = express()

// Middleware
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));


// routes
app.use("/api/chat",ChatRouter)
app.use("/api/upload", uploadRouter)


app.listen(PORT, async()=>{
    
    try {
        await connection
        console.log("Conneced to DB")
        console.log(`Server is runnig at port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
})


