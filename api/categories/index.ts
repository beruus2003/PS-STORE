import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../_storage";
import { insertCategorySchema } from "../../shared/schema";
import { z } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const categories = await storage.getCategories();
      return res.status(200).json(categories);
    }

    if (req.method === "POST") {
      const data = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(data);
      return res.status(201).json(category);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
