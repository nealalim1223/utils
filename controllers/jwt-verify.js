const crypto = require('crypto');

const base64UrlDecode = (str) => {
  const padding = '='.repeat((4 - str.length % 4) % 4);
  return JSON.parse(Buffer.from((str + padding).replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString());
};

const base64UrlEncode = (obj) => {
  return Buffer.from(obj)
    .toString('base64')
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const signatureFunction = (header, payload, secret) => {
  const data = `${header}.${payload}`;
  const hmac = crypto.createHmac('sha256', secret);
  return base64UrlEncode(hmac.update(data).digest());
};

module.exports = async (token, secretKey) => {
  if (typeof token !== 'string') {
    throw new TypeError("Token must be a string");
  }

  // console.log("Received Token:", token);

  const [header, payload, signature] = token.split('.');

  // console.log("Header:", header);
  // console.log("Payload:", payload);

  const expectedSignature = signatureFunction(header, payload, secretKey);
  // console.log("Expected Signature:", expectedSignature);
  // console.log("Provided Signature:", signature);

  if (expectedSignature !== signature) {
    throw new Error("Invalid token");
  }

  const decodedPayload = base64UrlDecode(payload);
  return decodedPayload;
};
