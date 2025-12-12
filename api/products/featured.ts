import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../_storage";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const products = await storage.getFeaturedProducts();
      return res.status(200).json(products);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
