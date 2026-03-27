import { v2 as cloudinary } from 'cloudinary'
import fs from "node:fs"
import dotenv  from 'dotenv'
import { error } from 'node:console';
dotenv.config()

// configuration
cloudinary.config({ 
  cloud_name: 'dayxbdfcs', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async(filePath)=>{

    const uploadResult = await cloudinary.uploader.upload(filePath,
        {
            resource_type : "auto"
        }
    )
    .catch((error)=>{
        console.log(error);
        // if failes remove file our server
        fs.unlinkSync(filePath)
    })
    return uploadResult
}

export default uploadToCloudinary

