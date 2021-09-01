'use strict';

const { InternalServerError } = require('../languages/languageSet')();
const {
  sendBirdConnectionServer,
  sendBirdCreateChannelService,
  sendBirdOpenChannelService,
} = require('../service/sendbirdService');
const { jwtDecrypt } = require('../utils/crypo');

module.exports.postSendbirdConnection = async (req, res) => {
  const { userId, nickname } = jwtDecrypt(req.headers.authorization);

  try {
    const response = sendBirdConnectionServer({ userId, nickname });

    await sendBirdOpenChannelService(await sendBirdCreateChannelService());

    return res.send(response).status(200);
  } catch (error) {
    return res.send(InternalServerError).status(500);
  }
};
