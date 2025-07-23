

function convertSecondsToDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${secs}s`;
}

module.exports = {
  convertSecondsToDuration,
};
