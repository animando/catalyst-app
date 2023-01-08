
export const handlerPath = (context: string) => {
    const tokens = context.split(process.cwd());
    const prefix = tokens[1].slice(1);
    return prefix
}
