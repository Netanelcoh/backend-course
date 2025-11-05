import * as fs from "node:fs";
import * as readline from "node:readline";
import * as path from "node:path";
import { OUTPUT_FOLDER } from "./consts.js";

export async function dedup(initialFiles: string[]) {
  const resultFileName = path.join(OUTPUT_FOLDER, "final_result.txt");

  try {
    for (let i = 0; i < initialFiles.length; i++) {
      await dedupAndWrite(initialFiles[i], resultFileName);
    }
  } catch (error) {
    console.log(`Error: failed to dedup file`);
  }
}

async function dedupAndWrite(input: string, output: string) {
  let outputWriteHandler;
  let inputReadHandler;
  let rl;
  try {
    outputWriteHandler = fs.createWriteStream(output, { flags: "a" });
    inputReadHandler = fs.createReadStream(input);
    rl = readline.createInterface({
      input: inputReadHandler,
      crlfDelay: Infinity,
    });

    const set = new Set<string>();

    for await (const line of rl) {
      set.add(line);
    }

    for (const line of set) {
      outputWriteHandler.write(line + "\n");
    }
  } catch (error) {
    console.log(`Error: failed to dedup ${input}`);
  } finally {
    outputWriteHandler?.close();
    inputReadHandler?.close();
    rl?.close();
  }
}
