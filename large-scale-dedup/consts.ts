import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const INPUT_FILE = "input_100mb.txt";
export const MAX_CHUNK_SIZE_BYTES = 100;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const OUTPUT_FOLDER = join(__dirname, "result");
export const SECRET_KEY = "secret";
export const NUMBER_OF_BUCKETS = 6;
