import express from "express"
import protect from "../middleware/authMiddleware.js"
import postController from "../controllers/postController.js"
import savePost from "../models/savePostModel.js"
import savePostController from "../controllers/savePostController.js"
import commentController from "../controllers/commentController.js"

const router = express.Router({mergeParams : true})

router.post("/",protect.forUser,postController.generateAndPost)
router.get("/:pid",protect.forUser,postController.getPost)
router.get("/",protect.forUser,postController.getPosts)
router.put("/:pid",protect.forUser,postController.likesAndUnlikePost)
router.post("/:pid",protect.forUser,postController.reportPost)

//save-post
router.post("/:pid/save",protect.forUser,savePostController.savePost)

// comment post Routes
router.get("/:pid/comments",protect.forUser,commentController.getComments)
router.post("/:pid/comments",protect.forUser,commentController.addComments)
router.delete("/:pid/comments/:cid",protect.forUser,commentController.removeComments)

export default router