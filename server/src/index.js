import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

const allowedOrigins = (() => {
  switch (process.env.NODE_ENV) {
    case "development":
      return ["http://localhost:3000"];
    case "production":
      return ['https://active-cooking.vercel.app/'];
    default:
      return [];
  }
})();

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Witaj w Active Cooking API!");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/recipes', (req, res) => {
  res.json([
    { id: 1, title: 'Makaron z pesto' },
    { id: 2, title: 'Pizza Margherita' }
  ]);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server działa na http://localhost:${PORT}`);
});
