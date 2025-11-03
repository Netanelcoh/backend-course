import { INPUT_FILE } from "./consts";
import { partion } from "./partioning";
import { dedup } from "./dedup";

try {
  const filesNames = await partion(INPUT_FILE);
  await dedup(filesNames ?? []);
  console.log("Finish");
} catch (error) {
  console.log("Error: Unable to complete operation");
}
