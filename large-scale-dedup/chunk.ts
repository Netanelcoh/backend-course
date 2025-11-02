import * as fs from "fs";
import * as readline from "readline";
import { OUTPUT_FOLDER, SECRET_KEY } from "./consts";
import path, { join } from "node:path";
import { createHash } from "./hash";
import { mkdir } from "node:fs/promises";

export async function sliceFileToKOutputFiles(inputFile: string, k: number) {
  const outputFilesNames = createOutputFilesNames(OUTPUT_FOLDER, k);
  let outputFilesHandlers: fs.WriteStream[] = [];

  try {
    if (!fs.existsSync(inputFile)) {
      console.error(`Error: Input file "${inputFile}" not found.`);
      return;
    }

    if (fs.existsSync(OUTPUT_FOLDER)) {
    fs.unlinkSync(OUTPUT_FOLDER);
  }
    await mkdir(OUTPUT_FOLDER, { recursive: true });

    outputFilesHandlers = createFilesHandlers(outputFilesNames);

    const fileStream = fs.createReadStream(inputFile);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      const hash = createHash(SECRET_KEY, line).substring(0, 8);
      const fileIndex = parseInt(hash, 16) % k;

      outputFilesHandlers[fileIndex].write(line + "\n");
    }
    return outputFilesNames;
  } catch (error) {
  } finally {
    for (const fd of outputFilesHandlers) {
      fd.close();
    }
  }
}

function createOutputFilesNames(path: string, k: number) {
  const files: string[] = [];
  for (let i = 0; i < k; i++) {
    files.push(join(path, `outfile_${i}.txt`));
  }

  return files;
}

function createFilesHandlers(files: string[]) {
  const filesHandlers = [];
  for (let i = 0; i < files.length; i++) {
    const fd = fs.createWriteStream(files[i], { flags: "a" });
    filesHandlers.push(fd);
  }

  return filesHandlers;
}
