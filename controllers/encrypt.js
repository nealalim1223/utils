// const crypto = require("crypto");

module.exports = async (payload, secret) => {
  if (!crypto) {
    throw new Error("No WebAPI crypto module found.");
  }

  const iv = crypto.getRandomValues(new Uint8Array(16));
  const algorithm = { name: "AES-GCM", iv };
  const key = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  const enc = new TextEncoder().encode(payload);
  const encrypted = await crypto.subtle.importKey("raw", key, algorithm, false, ["encrypt"]);
  const result = await crypto.subtle.encrypt(algorithm, encrypted, enc);

  return `${Buffer.from(result).toString("base64")};${Buffer.from(iv).toString("base64")}`;
};
