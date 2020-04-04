const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const { map, forEach } = Array.prototype;

const dateSelectors = document.getElementsByClassName('js-date-format');
const dateStrings = map.call(dateSelectors, date => date.innerHTML );

function parse(dateString) {
  const nowMill = new Date().getTime();
  const dateMill = new Date(dateString).getTime();

  const difference = nowMill - dateMill;

  const handlePlural = (time, text) => time >= 2 ? text+'s' : text;

  if(difference >= DAY)
    return dateString;
  else if(difference >= HOUR) {
    const time = difference / HOUR;
    return `${time.toFixed(0)} ${handlePlural(time, 'hour')} ago`;
  }
  else if(difference >= MINUTE) {
    const time = difference / MINUTE;
    return `${time.toFixed(0)} ${handlePlural(time, 'minute')} ago`;
  }
  else {
    const time = difference / SECOND;
    return `${time.toFixed(0)} ${handlePlural(time, 'second')} ago`;
  }
}

function updateText() {
  const parsedDates = dateStrings.map(dateString => parse(dateString));
  forEach.call(dateSelectors, (selector, i) => selector.innerHTML = parsedDates[i]);
}

updateText();
setInterval(updateText, 1 * SECOND);
