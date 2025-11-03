import { createHmac } from "crypto";
import { NUMBER_OF_BUCKETS, SECRET_KEY } from "./consts";

export function getBucket(line: string) {
  const hash = createHmac("sha256", SECRET_KEY).update(line).digest("hex");
  const hashInt = parseInt(hash.substring(0, 8), 16);

  return hashInt % NUMBER_OF_BUCKETS;
}
