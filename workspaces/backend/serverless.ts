import { AWS } from '@serverless/typescript';

import { hello } from './services/hello';

const config: AWS = {
  service: 'backend',
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'eu-west-2'
  },
  plugins: [
    'serverless-plugin-typescript',
    'serverless-offline',
  ],
  functions: {
    hello
  }
}

module.exports = config;