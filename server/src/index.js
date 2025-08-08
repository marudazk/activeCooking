import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Backend działa!");
});

app.get("/users", async (req, res) => {
  const users = await prisma.User.findMany();
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
