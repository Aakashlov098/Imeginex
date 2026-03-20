import express from "express"
import profileControllers from "../controllers/profileControllers.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/followings",protect.forUser,profileControllers.myFollowings)
router.get("/followers",protect.forUser,profileControllers.myFollowers)

export default router