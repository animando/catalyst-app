import { AWS } from '@serverless/typescript';

import { hello } from './services/hello';

const config: AWS = {
  service: 'backend',
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'eu-west-2',
    stage: 'local',
    environment: {
      SPA_URL: '${file(./serverlessVariables-${self:custom.stage}.yml):spaUrl}'
    },
  },
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
  ],
  functions: {
    hello
  },
  custom: {
    stage: '${opt:stage, self:provider.stage}',
    esbuild: {
      bundle: true,
      minify: false,
      packager: 'yarn'
    },
    'serverless-offline': {
      noPrependStageInUrl: true
    }
  },
}

module.exports = config;