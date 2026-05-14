

// export default generateImage;


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Take_promt
// // Generate Image With AI Model
// // Store On  Local Server
// // Upload On Cloudinary
// // Remove From Server
// // Repond With Caption And Post
// const generateAndPost = async (req, res) => {
//   let userId = req.user.id;
//   let newPost;

//   try {
//     // get-Prompt
//     const { prompt } = req.body;
    

//     // check if Prompt is Coming in body
//     if (!prompt) {
//       res.status(409);
//       throw new Error("Kindly Provide The To Generate Prompt!");
//     }
//     // Initialize Google Gen Ai Instance
//     const ai = new GoogleGenAI({});

//     // API Call to generate Image
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash-image",
//       contents: prompt,
//     });

//     // loop Through Correct Response
//     for (const part of response.candidates[0].content.parts) {
//       if (part.text) {
//         console.log(part.text);
//       } else if (part.inlineData) {
//         const imageData = part.inlineData.data;
//         const buffer = Buffer.from(imageData, "base64");
//         // fs.writeFileSync("generate-Content/"+crypto.randomUUID()+".png", buffer);
//         // console.log("Image saved as gemini-native-image.png");

//         // save Locally
//         const fileName = crypto.randomUUID() + ".png";
//         const filePath = path.join(__dirname, "../generate-Content", fileName);

//         // Write File into A Server
//         fs.writeFileSync(filePath, buffer);
//         console.log(filePath);

//         // Upload Post
//         const imageLink = await uploadToCloudinary(filePath);
//         console.log(imageLink);

//         // Remove-Image From the Server
//         fs.unlinkSync(filePath);

//         // Create Post
//         newPost = new Post({
//           user: userId,
//           imageLink: imageLink.secure_url,
//           prompt: prompt,
//         });

//         // save Post To Db
//         await newPost.save();
//         // Aggrigate User Details In newPost Object
//         await newPost.populate("user");
//       }
//     }

//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(409);
//     throw new Error("Image Generation Failed !!" + error);
//   }
// };

// MODEL 2

// 
// export default generateImage










// MODEL ONE 

// // Cloudinary config
// cloudinary.v2.config({
//   cloud_name: 'dayxbdfcs',
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const generateImage = async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     console.log(prompt)
//     if (!prompt) {
//       return res.status(400).json({ message: "Prompt is required" });
//     }

//     // Hugging Face se image generate karo
//     const hfResponse = await fetch(
//        "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ inputs: prompt,options: { wait_for_model: true }  }),
//       }
//     );

//     console.log(hfResponse)
//     if (!hfResponse.ok) {
//       throw new Error("Image generation failed from Hugging Face");
//     }

//     // Image buffer lo
//     const imageBuffer = await hfResponse.arrayBuffer();
//     const base64Image = Buffer.from(imageBuffer).toString("base64");
//     const dataUri = `data:image/png;base64,${base64Image}`;

//     // Cloudinary pe upload karo
//     const uploadResult = await cloudinary.v2.uploader.upload(dataUri, {
//       folder: "generated-images",
//     });

//     res.status(200).json({
//       success: true,
//       imageUrl: uploadResult.secure_url,
//     });

//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



// model 3

// import fetch from "node-fetch";


// const generateAndPost = async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     const userId = req.user._id;
//     console.log(prompt)
//     if (!prompt) {
//       return res.status(400).json({ error: "Prompt is required" });
//     }

//     // 🔥 Cloudflare Worker call
//     const response = await fetch(process.env.WORKER_URL, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${process.env.API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ prompt }),
//     });

//     const data = await response.json();

//     if (!data.success) {
//       throw new Error("Image generation failed");
//     }

//     // 💾 Save in DB
//     const newPost = new Post({
//       user: userId,
//       image: data.imageUrl, // already Cloudinary URL from Worker
//       prompt: prompt,
//     });

//     await newPost.save();
//     await newPost.populate("user");

//     res.status(201).json(newPost);

//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

