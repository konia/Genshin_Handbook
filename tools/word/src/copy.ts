import fs from 'fs';
import { config } from 'dotenv';

function main() {
  config({ path: `.env`, override: true });
  config();

  let outputDir = './output';
  if (process.env.OUT_DIR) {
    outputDir = process.env.OUT_DIR;
  }
  fs.cpSync(`${outputDir}/words/`, '../../admin/', { recursive: true });
}

main();
