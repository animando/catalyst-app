import { handlerPath } from "../../utils/handlerPath";

const corsConfig = {
    origin: '${file(./serverlessVariables-${self:custom.stage}.yml):spaDomainName}',
    headers: [
        'Content-Type',
        'X-Amz-Date',
        'Authorization',
        'X-Api-Key',
        'X-Amz-Security-Token',
        'X-Amz-User-Agent',
        'X-Amzn-Trace-Id',
    ],
    allowCredentials: false,
    cacheControl: 'max-age=600, s-maxage=600, proxy-revalidate'
}

console.log({ corsConfig });

export const hello = {
    handler: `${handlerPath(__dirname)}/handler.hello`,
    events: [
        {
            http: {
                path: 'hello',
                method: 'get',
                cors: corsConfig,
            }
        }
    ]
};
