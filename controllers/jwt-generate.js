const { SignJWT } = require("jose");

module.exports = async (payload, secret, expiresIn) => {
  const jwt = await new SignJWT(payload)
    .setExpirationTime(expiresIn)
    .sign(new TextEncoder().encode(secret));
  return jwt;
};
