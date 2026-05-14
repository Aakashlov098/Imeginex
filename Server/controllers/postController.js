import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import uploadToCloudinary from "../middleware/cloudinaryMiddleware.js";
import Post from "../models/postModel.js";
import User from "../models/userModels.js";
import Report from "../models/reportModel.js";
import cloudinary from "cloudinary";

const generateAndPost = async (req, res) => {
  try {
    const { prompt } = req.body;
    let userId = req.user.id;

    // check if user Exist
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User Not Found!");
    }

    // check if user have Enough Credits
    if (user.credits < 1) {
      res.status(409);
      throw new Error("Not Enough Credits!");
    }
    // Better parameters add kiye
    const enhancedPrompt = `${prompt}, photorealistic, ultra detailed, 8K, DSLR photography, natural lighting, real photograph, not cartoon, not animated, not illustration`;

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?model=flux-realism&width=1024&height=1024&nologo=true&enhance=true`;
    // Directly Cloudinary pe upload karo
    const uploadResult = await cloudinary.v2.uploader.upload(imageUrl, {
      folder: "generated-images",
    });

    // Create Post
    const newPost = new Post({
      user: userId,
      imageLink: uploadResult.secure_url,
      prompt: prompt,
    });

    // save Post To Db
    await newPost.save();
    // Aggrigate User Details In newPost Object
    await newPost.populate("user");

    // Update Credits
    await User.findByIdAndUpdate(
      userId,
      { credits: user.credits - 1 },
      { new: true },
    );

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
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

  if (post.likes.includes(currentUser._id)) {
    // Dislike
    await Post.findByIdAndUpdate(req.params.pid, {
      $pull: { likes: currentUser._id },
    });
  } else {
    // Like
    await Post.findByIdAndUpdate(req.params.pid, {
      $push: { likes: currentUser._id },
    });
  }

  const updatedPost = await Post.findById(req.params.pid).populate("user");
  res.status(200).json(updatedPost);
};

const reportPost = async (req, res) => {
  const { text } = req.body;
  const userId = req.user._id;
  const postId = req.params.pid;

  console.log(text, userId, postId);
  if (!text) {
    res.status(409);
    throw new Error("Please Enter Text!");
  }

  const alreadyReported = await Report.findOne({
    user: userId,
    post: postId,
  });


  const newReport = new Report({
    user: userId,
    post: postId,
    text: text,
  });

  await newReport.save();
  await newReport.populate("user");
  await newReport.populate("post");

  if (!newReport) {
    res.status(409);
    throw new Error("Unale To Report This Post!!");
  }

  res.status(201).json({
    message: "Report submitted successfully!", 
    report: newReport 
  });
};

const postController = {
  generateAndPost,
  getPosts,
  getPost,
  likesAndUnlikePost,
  reportPost,
};
export default postController;
