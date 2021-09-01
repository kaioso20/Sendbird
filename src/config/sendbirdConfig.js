const SendBird = require('sendbird');
const dotenv = require('dotenv');
dotenv.config();

module.exports.sendbird = new SendBird({
  appId: process.env.ENV_APPLICATION_ID,
});
