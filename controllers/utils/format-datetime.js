module.exports = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    // timeZone: 'Asia/Manila',
  };

  const formattedDate = new Date(date).toLocaleString('en-US', options);
  const [month, day, year] = formattedDate.split(', ')[0].split('/');
  const [time, period] = formattedDate.split(', ')[1].split(' ');

  return `${year}-${month}-${day} ${time} ${period}`;
}
