import { db } from "@/lib/drizzle";
import { DrizzleError } from "drizzle-orm";

export async function sendMessageAction(formData: FormData) {
  const sentMessage = formData.get("message") as string;
  try {
    const result = await db.insert(message).values();
  } catch (err) {
    if (err instanceof DrizzleError) {
      return {
        message: "Database Error",
      };
    }
  }
}
