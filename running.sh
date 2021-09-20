# 运行 pm2 服务
source ~/.bashrc
export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh
echo $PASS
echo $PHONE
yarn && pm2 reload ecosystem.config.js && pm2 restart ecosystem.config.js