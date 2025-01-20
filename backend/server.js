import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import ProductRouter from "./Routers/ProductsRouters.js";
import path from "path";
dotenv.config();
const app = express();
app.use(express.json());

app.use(cors());
const connect = async () => {
  await mongoose
    .connect(process.env.MDB)
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(
          `server started working on http://localhost:${process.env.PORT}`
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
connect();
app.use("/api", ProductRouter);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
