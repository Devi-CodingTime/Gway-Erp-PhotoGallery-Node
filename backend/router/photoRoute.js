import express from "express";
import upload from "../middleware/upload.js";
import { uploadPhoto, getPhotosByAlbum, getAllPhotos,uploadMultiplePhotos,getFile } from "../controller/photoController.js";
import { requireSignIn } from "../middleware/requireSignIn.js";

const router = express.Router();

router.post("/upload", upload.single("file"),requireSignIn, uploadPhoto);
router.post(
  "/upload-multiple",
  requireSignIn,
  upload.array("photos", 10), // max 10 files
  uploadMultiplePhotos
);
router.get("/file/:filename", getFile); // Get photo by filename
router.get("/:albumId", requireSignIn, getPhotosByAlbum);
router.get("/", requireSignIn, getAllPhotos); // Assuming you have a function to get all photos

export default router;
