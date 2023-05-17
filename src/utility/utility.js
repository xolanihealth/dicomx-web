/**
 * Return ellipsis of a given string
 * @param {string} text
 * @param {number} size
 */
const ellipsis = (text, size) => {
  return `${text.split(' ').slice(0, size).join(' ')}...`;
};

const idGenerator = (events, length = 1) => {
  const arrayData = [];
  events.map((data) => {
    return arrayData.push(parseInt(data.id, 10));
  });
  const number = (Math.max(...arrayData) + 1).toString();
  return number.length < length ? `${'0'.repeat(length - number.length)}${number}` : number;
};

const dateObjToString = (date, format) => {
  const year = date?.getFullYear()?.toString();
  let month = ((date?.getMonth() || 0) + 1)?.toString();
  let day = String(date?.getDate());

  if (year === 'NaN' || month === 'NaN' || day === 'NaN') return null;

  month = month?.length === 1 ? `0${month}` : month;
  day = day?.length === 1 ? `0${day}` : day;

  return format
    .replace(/YYYY|yyyy/g, year)
    .replace(/MM|mm/g, month)
    .replace(/DD|dd/g, day);
};
export { ellipsis, idGenerator, dateObjToString };
