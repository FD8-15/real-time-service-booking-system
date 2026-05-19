import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadOnCloudinary = async (localPath) => {
    try {
        if (!localPath) return null;
        const res = await cloudinary.uploader.upload(localPath, {
            resource_type: "auto"
        });
        console.log("✅ Uploaded:", res.url);
        return res;
    } catch (error) {
        console.log("❌ Cloudinary ERROR:", error.message); // 👈 MUST ADD
        try {
            fs.unlinkSync(localPath);
        } catch {}
        return null;
    }
};

export { uploadOnCloudinary };