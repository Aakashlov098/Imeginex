import connectDB from "./config/dbConfig.js"
import express, { json, urlencoded } from "express"
import dotenv from "dotenv"
import colors from "colors"
import path from 'node:path';
import { fileURLToPath } from 'url'


// LOCAL-IMPORTS
import authRoutes from "./routes/authRoutes.js"
import followRoutes from "./routes/followRoutes.js"
import errorHandler from "./middleware/errorHandlerMiddleware.js"
import profileRoutes from "./routes/profileRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import savedPostRoutes from "./routes/savePostRoutes.js"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '.env') })

const PORT = process.env.PORT || 5000
const app = express()


//DB-CONNECTION
connectDB()


// BODY-PARSER
app.use(express.urlencoded())
app.use(express.json())

// DEFAULT-ROUTES
// app.get("/",(req,res)=>{
//     res.json({
//         message : "WELCOME TO IMAGINE-API....🌠"
//     })
// })

// AUTH-ROUTES
app.use("/api/auth",authRoutes)

// FOLLOW-ROUTES
app.use("/api/user",followRoutes)

// PROFILE-ROUTES
app.use("/api/profile",profileRoutes)

// ADMIN-ROUTES
app.use("/api/admin",adminRoutes)

// POST-ROUTES
app.use("/api/posts",postRoutes)

//SAVED-POST'S
app.use("/api/saved-post",savedPostRoutes)


const buildPath = path.resolve(__dirname, '../Client/dist');

// Static File Serving & SPA Routing
if (process.env.NODE_ENV === "production") {
    // Serve static files from the build directory
    app.use(express.static(buildPath));

    // Express v5 requires a named parameter for wildcards (/*splat)
    app.get('/*splat', (req, res) => {
        res.sendFile(path.join(buildPath, 'index.html'), (err) => {
            if (err) {
                // If index.html is missing, this provides a clearer error
                res.status(500).send("Build file index.html not found. Ensure you ran 'npm run build' in the client folder.");
            }
        });
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running... (Development Mode)");
    });
}

// ERROR-HANDLER
app.use(errorHandler)
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT NO. : ${PORT}`.bgGreen.black)
})