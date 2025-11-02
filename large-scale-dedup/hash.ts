import { createHmac, Hash, Hmac } from "crypto";

export function createHash(secret: string, data: string) {
  return createHmac("sha256", secret).update(data).digest("hex");
}
