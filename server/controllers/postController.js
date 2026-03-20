import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateAndPost =async(req,res)=>{
    try {
      // get-Prompt
    const {prompt} = req.body
    
    // check if Prompt is Coming in body 
    if(!prompt){
        res.status(409)
        throw new Error("Kindly Provide The To Generate Prompt!")
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
      const fileName = crypto.randomUUID()+".png";
      const filePath = path.join(__dirname,"../generate-Content",fileName);

      // Write File into A Server
      fs.writeFileSync(filePath,buffer);
      console.log(filePath)

      // Create Post
    }
  }

  res.send("generateImage")

  } 
    
    catch (error) {
      res.status(409)
      throw new Error("Image Generation Failed !!"+error)
    }
  }
const postController = {generateAndPost}
export default postController