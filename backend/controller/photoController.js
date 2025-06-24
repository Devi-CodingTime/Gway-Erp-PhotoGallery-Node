import Photo from "../model/photoModel.js";
import Album from "../model/albumModel.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadPhoto = async (req, res) => {
  try {
    const { albumId, caption } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({success:false, message: "No file uploaded" });
    }

    // Optional: Check if album exists
    const albumExists = await Album.findById(albumId);
    if (!albumExists) {
      return res.status(404).json({success:false, message: "Album not found" });
    }

    const newPhoto = new Photo({
      filename: file.filename,
      caption: caption || "",
      albumId,
      uploadedBy: req.user?._id || null  // Assuming you're using auth
    });

    await newPhoto.save();

    res.status(201).json({
      success:true,
      message: "Photo uploaded successfully",
      photo: newPhoto
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const uploadMultiplePhotos = async (req, res) => {
  try {
    const { albumId, uploadedBy, captions = [] } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No images provided" });
    }

    const photos = req.files.map((file, index) => ({
      filename: file.filename,
      albumId,
      uploadedBy,
      caption: captions[index] || "", // optional caption
    }));

    const savedPhotos = await Photo.insertMany(photos);

    res.status(201).json({
      success: true,
      message: "Photos uploaded successfully",
      data: savedPhotos,
    });
  } catch (error) {
    console.error("Error uploading photos:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const getPhotosByAlbum = async (req, res) => {
  try {
    const { albumId } = req.params;

    // Validate albumId
    if (!albumId) {
      return res.status(400).json({success:false, message: "Album ID is required" });
    }

    const photos = await Photo.find({ albumId }).populate("uploadedBy", "name");

    if (photos.length === 0) {
      return res.status(404).json({success:false, message: "No photos found for this album" });
    }

    res.status(200).json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({success:false, message: "Server error", error: error.message });
  }
}
export const getAllPhotos = async (req, res) => {
  try {
    const q = req.query.q || "";
    const filter = q ? { caption: { $regex: q, $options: "i" } } : {};
    const photos = await Photo.find(filter  ).populate("uploadedBy", "name");

    if (photos.length === 0) {
      return res.status(404).json({success:false, message: "No photos found" });
    }

    res.status(200).json({success:true,
      message: "Photos retrieved successfully",
      data:photos
    });
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({success:false, message: "Server error", error: error.message });
  }
}

export const getFile = async (req, res) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).json({ success: false, message: "Filename is required" });
    }

    const filePath = path.join(__dirname, "../uploads", filename);

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(404).json({ success: false, message: "File not found" });
      }
    });
  } catch (error) {
    console.error("Error in getFile:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
