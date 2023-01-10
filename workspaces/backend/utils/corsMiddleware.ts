import { config } from './config';

export const corsMiddleware = () => {
  return {
    onError: undefined,
    before: undefined,
    after: (event: any) => {
      event.response.headers = {
        ...event.response.headers,
        'Access-Control-Allow-Origin': `${config.SPA_DOMAIN_NAME}`,
      }
    }
  }
}