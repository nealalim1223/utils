module.exports = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const keyLength = 36;
  const hyphenIndices = [8, 13, 18, 23];

  let key = '';
  for (let i = 0; i < keyLength; i++) {
    if (hyphenIndices.includes(i)) {
      key += '-';
    } else {
      key += characters[Math.floor(Math.random() * characters.length)];
    }
  }

  return key;
}
