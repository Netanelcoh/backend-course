import { INPUT_FILE } from "./consts.js";
import { partion } from "./partioning.js";
import { dedup } from "./dedup.js";

try {
  const filesNames = await partion(INPUT_FILE);
  await dedup(filesNames ?? []);
  console.log("Finish");
} catch (error) {
  console.log("Error: Unable to complete operation");
}
