const express = require("express")
const cors = require("cors")
const fs = require('fs');
const path = require('path');
const { connection } = require("./db")
const ChatRouter = require("./routes/chatRoute")
const uploadRouter = require("./routes/uploadRoute")
require("dotenv").config()

const PORT = process.env.PORT || 8080
const app = express()



// Ensure 'uploads' folder exists and is writable
const uploadsDir = path.join(__dirname, 'uploads');
try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log("Uploads directory created.");
  } else {
    fs.accessSync(uploadsDir, fs.constants.W_OK);
    console.log("Uploads directory is writable.");
  }
} catch (error) {
  console.error("Uploads directory is not writable:", error.message);
  process.exit(1); // Exit server if directory is not writable
}



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

