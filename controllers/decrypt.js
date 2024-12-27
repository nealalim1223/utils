const crypto = require("crypto");

module.exports = async (encrypted, secret) => {
  if (!crypto) {
    throw new Error("No WebAPI crypto module found.");
  }

  const ciphertext = encrypted.split(";")[0];
  const iv = encrypted.split(";")[1];

  if (!ciphertext || !iv) {
    throw new Error("Invalid encrypted data.");
  }

  const algorithm = { name: "AES-GCM", iv };
  const key = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(secret));
  const decrypted = await crypto.subtle.importKey("raw", key, algorithm, false, ["decrypt"]);

  try {
    const decryptedText = await crypto.subtle.decrypt(algorithm, decrypted, Buffer.from(ciphertext, "base64"));
    return new TextDecoder().decode(decryptedText);
  } catch (error) {
    throw new Error("Failed to decrypt data.");
  }
};
