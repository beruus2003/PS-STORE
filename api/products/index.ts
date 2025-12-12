import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../_storage";
import { insertProductSchema } from "../../shared/schema";
import { z } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const featured = req.query.featured === "true";
      const products = featured
        ? await storage.getFeaturedProducts()
        : await storage.getProducts();
      return res.status(200).json(products);
    }

    if (req.method === "POST") {
      const data = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(data);
      return res.status(201).json(product);
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
