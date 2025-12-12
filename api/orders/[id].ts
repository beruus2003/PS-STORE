import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../_storage";
import { insertOrderSchema } from "../../shared/schema";
import { z } from "zod";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  try {
    const numId = parseInt(id as string);
    if (isNaN(numId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    if (req.method === "GET") {
      const order = await storage.getOrder(numId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      const items = await storage.getOrderItems(numId);
      return res.status(200).json({ ...order, items });
    }

    if (req.method === "PATCH") {
      const data = insertOrderSchema.partial().parse(req.body);
      const order = await storage.updateOrder(numId, data);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json(order);
    }

    if (req.method === "DELETE") {
      await storage.deleteOrder(numId);
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
