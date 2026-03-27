import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import Post from "../models/postModel.js";
import User from "../models/userModels.js";
import Report from "../models/reportModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Take_promt
// Generate Image With AI Model
// Store On  Local Server
// Upload On Cloudinary
// Remove From Server
// Repond With Caption And Post
const generateAndPost = async (req, res) => {
  let userId = req.user.id;
  let newPost;

  try {
    // get-Prompt
    const { prompt, caption } = req.body;

    // check if Prompt is Coming in body
    if (!prompt || !caption) {
      res.status(409);
      throw new Error("Kindly Provide The To Generate Prompt!");
    }
    // Initialize Google Gen Ai Instance
    const ai = new GoogleGenAI({});

    // API Call to generate Image
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
    });

    // loop Through Correct Response
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        // fs.writeFileSync("generate-Content/"+crypto.randomUUID()+".png", buffer);
        // console.log("Image saved as gemini-native-image.png");

        // save Locally
        const fileName = crypto.randomUUID() + ".png";
        const filePath = path.join(__dirname, "../generate-Content", fileName);

        // Write File into A Server
        fs.writeFileSync(filePath, buffer);
        console.log(filePath);

        // Upload Post
        const imageLink = await uploadToCloudinary(filePath);
        console.log(imageLink);

        // Remove-Image From the Server
        fs.unlinkSync(filePath);

        // Create Post
        newPost = new Post({
          user: userId,
          imageLink: imageLink.secure_url,
          caption: caption,
        });

        // save Post To Db
        await newPost.save();
        // Aggrigate User Details In newPost Object
        await newPost.populate("user");
      }
    }

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409);
    throw new Error("Image Generation Failed !!" + error);
  }
};

const getPosts = async (req, res) => {
  const posts = await Post.find().populate("user");

  if (!posts) {
    res.status(404);
    throw new Error("Post Not Found!");
  }
  res.status(200).json(posts);
};

const getPost = async (req, res) => {
  const post = await Post.findById(req.params.pid).populate("user");

  if (!post) {
    res.status(404);
    throw new Error("Post Not Found!");
  }
  res.status(200).json(post);
};

const likesAndUnlikePost = async (req, res) => {
  let aakash;
  let currentUser = await User.findById(req.user._id);

  // check if user-Exist or Not
  if (!currentUser) {
    res.status(404);
    throw new Error("User Not Found!!");
  }

  // check if Post Exist or Not
  const post = await Post.findById(req.params.pid).populate("user");

  if (!post) {
    res.status(404);
    throw new Error("Post Not Found!!");
  }

  //check if Alredy Like
  if (post.likes.includes(currentUser._id)) {
    // dislike
    const updatedLikelist = post.likes.filter(
      (like) => like._id.toString() !== currentUser._id.toString(),
    );
    post.likes = updatedLikelist;
    await post.save();
  } else {
    //like
    //Add follower in liked
    await post.likes.push(currentUser._id);
    await post.save();
  }
  await Post.populate(post, { path: "likes" });

  res.status(200).json(post);
};

const reportPost = async (req,res) => {
  const {text} = req.body
  const userId = req.user._id
  const postId = req.params.pid

  console.log(text,userId,postId)
  if(!text){
    res.status(409)
    throw new Error("Please Enter Text!")
  }

  const alreadyReported = await Report.findOne({
  user: userId,
  post: postId
})

if (alreadyReported) {
  res.status(409)
  throw new Error("You already reported this post")
}
 
    const newReport = new Report({
    user : userId,
    post : postId,
    text : text
  })

  await newReport.save()
  await newReport.populate('user')
  await newReport.populate('post')


  if(!newReport){
    res.status(409)
    throw new Error("Unale To Report This Post!!")
  }

  res.status(201).json(newReport)
};

const postController = {
  generateAndPost,
  getPosts,
  getPost,
  likesAndUnlikePost,
  reportPost
};
export default postController;
