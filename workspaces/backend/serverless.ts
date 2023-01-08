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
    'serverless-esbuild',
    'serverless-offline',
  ],
  functions: {
    hello
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      packager: 'yarn'
    }
  }
}

module.exports = config;