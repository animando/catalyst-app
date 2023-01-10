import { handlerPath } from "../../utils/handlerPath";

const corsConfig = {
    origin: '${file(./serverlessVariables-${self:custom.stage}.yml):spaDomainName}',
    headers: [
        '*',
    ],
    allowCredentials: false,
    cacheControl: 'max-age=600, s-maxage=600, proxy-revalidate'
}

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
