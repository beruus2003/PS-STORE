import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../_storage";
import { insertCategorySchema } from "../../shared/schema";
import { z } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const numId = parseInt(id as string);
      let category;
      
      if (isNaN(numId)) {
        category = await storage.getCategoryBySlug(id as string);
      } else {
        category = await storage.getCategory(numId);
      }

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.status(200).json(category);
    }

    if (req.method === "PATCH") {
      const numId = parseInt(id as string);
      if (isNaN(numId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      const data = insertCategorySchema.partial().parse(req.body);
      const category = await storage.updateCategory(numId, data);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      return res.status(200).json(category);
    }

    if (req.method === "DELETE") {
      const numId = parseInt(id as string);
      if (isNaN(numId)) {
        return res.status(400).json({ message: "Invalid category ID" });
      }
      await storage.deleteCategory(numId);
      return res.status(204).end();
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
