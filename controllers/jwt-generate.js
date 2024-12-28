const crypto = require('crypto');

module.exports = async (payload, secret) => {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const base64UrlEncode = (obj) => {
    return Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/=+$/, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(payload);
  const signature = (encodedHeader, encodedPayload, secret) => {
    const data = `${encodedHeader}.${encodedPayload}`;
    const hmac = crypto.createHmac('sha256', secret);
    return Buffer.from(hmac.update(data).digest())
      .toString('base64')
      .replace(/=+$/, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const jwtSignature = signature(encodedHeader, encodedPayload, secret);

  // console.log("Encoded Header:", encodedHeader);
  // console.log("Encoded Payload:", encodedPayload);
  // console.log("JWT Signature:", jwtSignature);

  return `${encodedHeader}.${encodedPayload}.${jwtSignature}`;
};
