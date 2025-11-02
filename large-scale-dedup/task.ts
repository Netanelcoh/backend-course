import { INPUT_FILE } from "./consts";
import { sliceFileToKOutputFiles } from "./chunk";
import { dedup } from "./dedup";

try {
  const filesNames = await sliceFileToKOutputFiles(INPUT_FILE, 6);
  await dedup(filesNames ?? []);
  console.log("Finish");
} catch (error) {
  console.log("Error: Unable to complete operation");
}
