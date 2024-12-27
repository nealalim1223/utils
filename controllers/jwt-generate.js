// const jwt = require("jsonwebtoken");

module.exports = async (payload, secret, options) => {
  return jwt.sign(payload, secret, options);
};
