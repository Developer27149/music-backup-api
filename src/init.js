/* eslint-disable */
const dotenv = require('dotenv');
const { login_cellphone } = require('NeteaseCloudMusicApi');
dotenv.config();

const cookieGenerator = async () => {
  console.log('generate cookie');
  try {
    const result = await login_cellphone({
      phone: process.env.PHONE,
      password: process.env.PASS,
    });
    globalThis.cookie = result.body.cookie;
  } catch (error) {
    console.log(error);
  }
};

cookieGenerator();

module.exports = cookieGenerator;
