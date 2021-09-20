# 运行 pm2 服务
source ~/.bashrc
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
yarn && pm2 restart ecosystem.config.js