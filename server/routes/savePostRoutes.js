import express from "express"
import protect from "../middleware/authMiddleware.js"
import savePostController from "../controllers/savePostController.js"


const router = express.Router({mergeParams : true})

router.post("/",protect.forUser , savePostController.getSavePost)
router.delete("/:pid",protect.forUser , savePostController.removeSavePost)

export default router   