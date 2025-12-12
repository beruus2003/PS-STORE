import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "../_storage";
import { insertOrderSchema, type OrderItem } from "../../shared/schema";
import { z } from "zod";

const orderItemSchema = z.object({
  productId: z.number(),
  productName: z.string(),
  price: z.union([z.string(), z.number()]),
  quantity: z.number().min(1),
});

const createOrderSchema = insertOrderSchema.extend({
  items: z.array(orderItemSchema).min(1, "Order must have at least one item"),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === "GET") {
      const orders = await storage.getOrders();
      return res.status(200).json(orders);
    }

    if (req.method === "POST") {
      const orderInput = {
        ...req.body,
        userId: null,
        status: "pending",
      };

      const { items, ...orderData } = createOrderSchema.parse(orderInput);
      const order = await storage.createOrder(orderData);

      const createdItems: OrderItem[] = [];
      for (const item of items) {
        const orderItem = await storage.createOrderItem({
          orderId: order.id,
          productId: item.productId,
          productName: item.productName,
          price: String(item.price),
          quantity: item.quantity,
        });
        createdItems.push(orderItem);
      }

      return res.status(201).json({ ...order, items: createdItems });
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
