import { compileFromFile } from "json-schema-to-typescript";
import fs from "fs";
import path from "path";

const outDir = path.resolve(__dirname, "../compiled-types");
const schemaDir = path.resolve(__dirname, "../json-schemas");

const compileSchema = async (schema: string) => {
  const schemaFile = path.resolve(schemaDir, `${schema}.json`);
  // compile from file
  const ts = await compileFromFile(schemaFile);
  fs.writeFileSync(path.resolve(outDir, `${schema}.d.ts`), ts);
};

const mkdir = () => {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }
};

const run = async () => {
  mkdir();
  const schemas = ["Consumer1Message", "SnsTopic1Payload"];

  await Promise.all(schemas.map(compileSchema));
};

(async () => run())();
