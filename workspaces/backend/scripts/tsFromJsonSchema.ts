import { compileFromFile } from "json-schema-to-typescript";
import fs from "fs";
import path from "path";

const compileSchema = async (schema: string) => {
  const schemaFile = path.resolve(__dirname, `../json-schemas/${schema}.json`);
  // compile from file
  const ts = await compileFromFile(schemaFile);
  fs.writeFileSync(
    path.resolve(__dirname, "../compiled-types", `${schema}.d.ts`),
    ts
  );
};

const run = async () => {
  const schemas = ["Consumer1Message", "SnsTopic1Payload"];

  await Promise.all(schemas.map(compileSchema));
};

(async () => run())();
