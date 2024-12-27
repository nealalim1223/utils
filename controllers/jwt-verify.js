const { jwtVerify } = require("jose");

module.exports = async (token, secretKey) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secretKey));
    return payload;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
