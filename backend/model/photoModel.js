import mongoose from "mongoose";
const photoSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "album",
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
    }
}, {
  timestamps: true,
});

export default mongoose.model("photo", photoSchema); 
