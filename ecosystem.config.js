/**
 * This file is part of the PerfMa.
 * @link     : http://perfma.com
 * @author   : william (you@you.you)
 * @copyright: Copyright (c) 2019 Hangzhou perfma Network Technology Co., Ltd.
 */

module.exports = {
  apps: [{
    name: 'account',
    script: 'server/index.js',
    // Options reference: http://pm2.keymetrics.io/docs/usage/application-declaration/#generate-configuration
    // args: 'one two',
    instances: 0,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env_test: {
      API_GATEWAY: 'http://localhost:10020',
      NODE_ENV: 'production',
      PORT: 10020,
      HOST: '0.0.0.0',
    },
    // env_development: {
    //   NODE_ENV: 'development',
    // },
  }],
};
