import * as fs from "fs";
import type { WebhookMessage } from "./types";

export async function saveToFile(filename: string, message: WebhookMessage): Promise<void> {
  const jsonString = JSON.stringify(message, null, "\t");
  fs.writeFileSync(filename, jsonString);
}
