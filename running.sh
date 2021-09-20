# 运行 pm2 服务
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh   
yarn && pm2 reload ecosystem.config.js && pm2 restart ecosystem.config.js