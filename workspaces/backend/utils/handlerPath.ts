export const handlerPath = (context: string) => {
  const tokens = context.split(process.cwd());
  const prefix = tokens[1].slice(1);
  const p2 = prefix.replace(/\/serverless/, "");
  return p2;
};
