module.exports = {
  apps: [
    {
      name: 'music_api',
      script: 'src/app.js',
      log_date_format: 'YYYY-MM-DD HH:mm Z',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      instances: '1',
      autorestart: true,
      watch: '../',
      max_restarts: 3,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      exec_mode: 'cluster',
    },
  ],
};
