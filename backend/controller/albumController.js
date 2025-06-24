// controllers/albumController.js
import Album from "../model/albumModel.js";

// Create Album
export const createAlbum = async (req, res) => {
  try {
    const { title, createdBy } = req.body;
    const newAlbum = new Album({ title, createdBy });
    const savedAlbum = await newAlbum.save();
    res.status(201).json({ success: true, message: "Album created", album: savedAlbum });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get All Albums
export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate("createdBy", "name email");
    res.status(200).json({ success: true, albums });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get Single Album
export const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("createdBy", "name email");
    if (!album) {
      return res.status(404).json({ success: false, message: "Album not found" });
    }
    res.status(200).json({ success: true, album });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update Album
export const updateAlbum = async (req, res) => {
  try {
    const { title } = req.body;
    const updatedAlbum = await Album.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    if (!updatedAlbum) {
      return res.status(404).json({ success: false, message: "Album not found" });
    }
    res.status(200).json({ success: true, message: "Album updated", album: updatedAlbum });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Delete Album
export const deleteAlbum = async (req, res) => {
  try {
    const deletedAlbum = await Album.findByIdAndDelete(req.params.id);
    if (!deletedAlbum) {
      return res.status(404).json({ success: false, message: "Album not found" });
    }
    res.status(200).json({ success: true, message: "Album deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
