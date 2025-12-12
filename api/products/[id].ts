import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../_storage";
import { insertProductSchema } from "../../shared/schema";
import { z } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const numId = parseInt(id as string);
      let product;
      
      if (isNaN(numId)) {
        product = await storage.getProductBySlug(id as string);
      } else {
        product = await storage.getProduct(numId);
      }

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    }

    if (req.method === "PATCH") {
      const numId = parseInt(id as string);
      if (isNaN(numId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      const data = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(numId, data);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.status(200).json(product);
    }

    if (req.method === "DELETE") {
      const numId = parseInt(id as string);
      if (isNaN(numId)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }
      await storage.deleteProduct(numId);
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
