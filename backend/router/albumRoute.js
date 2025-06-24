// routes/albumRoutes.js
import express from "express";
import {
  createAlbum,
  getAllAlbums,
  getAlbumById,
  updateAlbum,
  deleteAlbum,
} from "../controller/albumController.js";

const router = express.Router();

// POST: Create new album
router.post("/", createAlbum);

// GET: Get all albums
router.get("/", getAllAlbums);

// GET: Get single album by ID
router.get("/:id", getAlbumById);

// PUT: Update album by ID
router.put("/:id", updateAlbum);

// DELETE: Delete album by ID
router.delete("/:id", deleteAlbum);

export default router;
