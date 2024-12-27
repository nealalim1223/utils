const jwt = require("jsonwebtoken");

module.exports = async (payload, secret, options) => {
  // Ensure options is an object
  options = (typeof options === 'object' && options !== null) ? options : {};

  return jwt.sign(payload, secret, options);
};
