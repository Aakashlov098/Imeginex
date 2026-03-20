import express from "express"
import generateImage from "../controllers/postController.js"
import protect from "../middleware/authMiddleware.js"
import postController from "../controllers/postController.js"

const router = express.Router()

router.post("/generate",protect.forUser ,postController.generateAndPost)

export default router