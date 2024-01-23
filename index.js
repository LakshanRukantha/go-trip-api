import express from "express";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKEY = process.env.API_KEY;
const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Welcome To GoTrip Server 🤗</h1>").status(200);
});

app.get("/status", (req, res) => {
  res
    .json({
      status: "Up And Running...",
    })
    .status(500);
});

app.post("/generate", async (req, res) => {
  try {
    const { advice } = await req.body;

    // Initiate the AI model
    const genAI = new GoogleGenerativeAI(apiKEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = advice;
    const result = await model.generateContent(prompt);
    const response = result.response;
    res.status(200).json(response.text());
  } catch (error) {
    console.log(`Error: ${error}`);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on PORT: ${PORT}`);
});
