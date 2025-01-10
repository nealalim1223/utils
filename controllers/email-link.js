module.exports = (label, value) => {
  return value ? `<a href="${value}" target="_blank" rel="noopener noreferrer">View ${label}</a>` : `No ${label.toLowerCase()} provided.`
}
