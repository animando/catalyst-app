import { config } from "../../utils/config";
import { handlerPath } from "../../utils/handlerPath";
const corsConfig = {
    origin: config.SPA_DOMAIN_NAME
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
