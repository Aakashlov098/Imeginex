import express from "express"
import followController from "../controllers/followController.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

router.put("/follow/:uid",protect.forUser,followController.followUserReqest)
router.put("/unfollow/:uid",protect.forUser,followController.unfollowUserReqest)

export default router