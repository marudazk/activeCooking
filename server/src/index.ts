import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "../../shared/generated/prisma/client";
import { Recipe } from "shared/types/types";

const c: Recipe = {
  id: 1,
  title: "Example Recipe",
  content: "This is an example recipe content.",
  createdAt: new Date(),
};

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

app.get("/", (_req: Request, res: Response) => {
  res.send("Witaj w Active Cooking API!");
});

app.get("/users", async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: (error as Error).message });
  }
});

app.get("/recipes", (_req: Request, res: Response) => {
  res.json([
    { id: 1, title: "Makaron z pesto" },
    { id: 2, title: "Pizza Margherita" },
  ]);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server działa na http://localhost:${PORT}`);
});
