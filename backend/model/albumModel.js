import mongoose from "mongoose";
const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "user",
  }
}, {
  timestamps: true,
});

export default mongoose.model("album", albumSchema);