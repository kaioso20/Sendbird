const JWT = require('jsonwebtoken');

const sharedSecret = 'doneStreet';

const jwtEncrypt = ({ userSecret, userDoc, userId, nickname }) =>
  `Bearer ${JWT.sign({ userSecret, userDoc, userId, nickname }, sharedSecret, {
    expiresIn: 1200,
  })}`;

const jwtDecrypt = (token = null) => {
  try {
    if (!!!token) throw new Error();

    token = token.replace('Bearer ', '');
    const { userSecret, userDoc, userId, nickname } = JWT.decode(token, {});
    return { userSecret, userDoc, userId, nickname };
  } catch (error) {
    return { userSecret: null, userDoc: null, userId: null, nickname: null };
  }
};

const jwtVerification = (token) =>
  JWT.verify(token, sharedSecret, (verificationError, decodedToken) => {
    if (verificationError != null)
      return { verificationError: true, auth: null };

    return { verificationError: null, auth: decodedToken };
  });

module.exports = { jwtEncrypt, jwtDecrypt, jwtVerification };
