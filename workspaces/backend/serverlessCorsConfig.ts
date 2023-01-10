export const corsConfig = {
    origin: '${file(./serverlessVariables-${self:custom.stage}.yml):spaUrl}',
    headers: [
        '*',
    ],
    allowCredentials: false,
    cacheControl: 'max-age=600, s-maxage=600, proxy-revalidate'
}

