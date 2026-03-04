import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "forntend", "dist");

  app.use(express.static(frontendPath));

  // Catch all routes
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
