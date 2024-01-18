import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const apiKEY = process.env.API_KEY;

const genAI = new GoogleGenerativeAI(apiKEY);

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = "Write a story about Sri Lanka.";

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  console.log(text);
}

run();
