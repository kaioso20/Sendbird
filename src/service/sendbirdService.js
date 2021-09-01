const { sendbird } = require('../config/sendbirdConfig');
const dotenv = require('dotenv');
dotenv.config();

module.exports.sendBirdConnectionServer = ({ userId, nickname }) =>
  sendbird.connect(userId, process.env.ENV_TOKEN_SENDBIRD, (user, error) => {
    if (!!error) console.log(error);

    if (!!!user.nickname) console.log('Atualizar o nickname');

    console.log('user', user);
  });

module.exports.sendBirdCreateChannelService = async () =>
  await sendbird.OpenChannel.createChannel((openChannel, error) => {
    if (error) return;

    return openChannel;
  });

module.exports.sendBirdOpenChannelService = async ({ url }) =>
  await sendbird.OpenChannel.getChannel(url, (openChannel, error) => {
    console.log('Bateu no sendBirdOpenChannelService');
    if (error) return;

    openChannel.enter((response, error) => {
      if (error) return;

      console.log(response);
    });
  });
