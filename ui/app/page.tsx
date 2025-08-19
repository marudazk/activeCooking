import { Recipe } from "shared/generated/prisma/client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch(`${backendUrl}/recipes`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return res.json();
}

export default async function Home() {
  const recipes = await getRecipes();
  return (
    <div>
      <h1>Active Cooking</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
    </div>
  );
}
