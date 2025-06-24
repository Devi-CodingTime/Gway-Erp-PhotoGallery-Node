import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/db.js";

import authRoute from "./router/authtRoute.js";
import photoRoute from "./router/photoRoute.js";
import albumRoutes from "./router/albumRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 3000;
const server = createServer(app);

// testing route
app.use("/auth", authRoute);
app.use("/photos", photoRoute);
app.use("/albums", albumRoutes);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

connectDB();
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
)



