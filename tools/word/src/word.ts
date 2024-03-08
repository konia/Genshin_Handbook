import path from 'path';
import fs from 'fs';
import { mkdirpSync } from 'mkdirp';
import { rimrafSync } from 'rimraf';
import { config } from 'dotenv';
import { Eta } from 'eta';
import prettier from 'prettier';

import Papa from 'papaparse';

type RecordType = {
  [key: string]: string | RecordType;
};

const LANGS = ['ja', 'en', 'zh'];
let outputDir = './output';
let globalTempObject: RecordType = {};

const PRETTIER_OPTIONS = {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  printWidth: 120,
  trailingComma: 'none' as 'none' | 'es5' | 'all' | undefined,
  parser: 'typescript'
};

export function formatCode(content: string) {
  return prettier.format(content, PRETTIER_OPTIONS);
}
function addItem(key: string, value: string) {
  let obj = globalTempObject;
  const keys = key.split('.');
  keys.forEach((item, index) => {
    if (!obj[item]) {
      if (index < keys.length - 1) {
        obj[item] = {};
      } else {
        obj[item] = value;
      }
    }
    obj = obj[item] as RecordType;
  });
}

function processingLanguage(data: string[][], index: number) {
  data.filter((item) => item[0]).map((item) => addItem(item[0], item[index]));
}

function processingSheet(data: any[][]) {
  const [header, ...rest] = data;
  return header.map((lang: string, index: number) => {
    if (LANGS.includes(lang)) {
      globalTempObject = {};
      processingLanguage(rest, index);
      return {
        [lang]: globalTempObject
      };
    }
    return null;
  });
}

async function outputCode(locale: string, content: RecordType) {
  const eta = new Eta({ views: path.join(__dirname, 'templates') });
  const res = eta.render('./langs', { locale, content });
  const result = await formatCode(res);
  try {
    const toPath = path.resolve(`${outputDir}/words/src/constants/langs-${locale}.ts`);
    mkdirpSync(path.dirname(toPath));
    fs.writeFileSync(toPath, result);
  } catch (err) {
    console.error(err);
  }
}

function generateWordList(rootDir: string, inputFile: string) {
  fs.readFile(path.resolve(rootDir + inputFile), async (error, data) => {
    if (error) {
      console.error(error);
      return;
    }
    const res = await data;
    Papa.parse(res.toString(), {
      complete: ({ data }) => {
        processingSheet(data as string[][]).forEach((sheet) => {
          if (sheet) {
            Object.entries(sheet).forEach(([lang, code]) => outputCode(lang, code));
          }
        });
      }
    });
  });
}

function main() {
  config({ path: `.env`, override: true });
  config();
  if (process.env.OUT_DIR) {
    outputDir = process.env.OUT_DIR;
  }
  rimrafSync(`${outputDir}`);
  if (process.env.FILE_ROOT && process.env.WROD_LIST_FILE) {
    generateWordList(process.env.FILE_ROOT, process.env.WROD_LIST_FILE);
  } else {
    throw new Error('Please define FILE_ROOT and WROD_LIST_FILE');
  }
}

main();
