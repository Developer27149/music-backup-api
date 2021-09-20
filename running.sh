# 运行 pm2 服务
source ~/.bashrc
yarn && pm2 reload ecosystem.config.js && pm2 restart ecosystem.config.js