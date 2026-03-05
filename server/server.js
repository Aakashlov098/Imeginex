import express, { json, urlencoded } from "express"
import dotenv from "dotenv"
import colors from "colors"
import connectDB from "./config/dbConfig.js"


// LOCAL-IMPORTS
import authRoutes from "./routes/authRoutes.js"
import followRoutes from "./routes/followRoutes.js"
import errorHandler from "./middleware/errorHandlerMiddleware.js"

dotenv.config()

const PORT = process.env.PORT || 5000
const app = express()


//DB-CONNECTION
connectDB()

// BODY-PARSER
app.use(express.urlencoded())
app.use(express.json())

// DEFAULT-ROUTES
app.get("/",(req,res)=>{
    res.json({
        message : "WELCOME TO IMAGINE-API....🌠"
    })
})

// AUTH-ROUTES
app.use("/api/auth",authRoutes)
// FOLLOW-ROUTES
app.use("/api/follow",followRoutes)

// ERROR-HANDLER
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT NO. : ${PORT}`.bgGreen.black)
})