import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Image file is required" });
  }

  const uploadResult = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "travel-booking" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(req.file.buffer);
  });

  return res.json({ url: uploadResult.secure_url, publicId: uploadResult.public_id });
};
