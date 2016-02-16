'use strict'
const moment = require('moment');
const Formatter = require('chinese-date-formatter');

function convertDateFormat (date, option) {
  // moment or chinese-date-formatter
  const tool = option.tool;
  const format = option.format;
  const locale = option.locale || 'en';

  switch (tool) {
    case 'chinese-date-formatter':
      date = (new Formatter(date))[format];
      break;
    case 'moment':
      date = date.locale(locale).format(format);
      break;
  }
  return date;
}

function addItem2XML (xml, date) {
  return xml
  .ele('item')
  .att('arg', date)
  .att('uid', date)
  .ele('title', date);
}

// return moment object
function parseQuery (query) {
  if (!/[0-9]/.test(query)) {
    return moment();
  }

  const regString = /([\-\+]?\d{1,})([dwmqy])?/i;
  const dateString = /(\d{1,2})[\.|\-|\/](\d{1,2})[\.|\-|\/]?(\d{2,4})?/;
  const matchArray = query.match(regString);
  const firstArg = matchArray[1];
  let secondArg = matchArray[2] ? matchArray[2].toLowerCase() : null;

  if (dateString.test(query)) {
    return moment(query, 'DD.MM.YY');
  } else if (secondArg === null) {
    return moment().date(firstArg);
  } else if (regString.test(query)) {
    switch (secondArg) {
      case 'd':
        secondArg = 'days';
        break;
      case 'w':
        secondArg = 'weeks';
        break;
      case 'm':
        secondArg = 'months';
        break;
      case 'q':
        secondArg = 'quarters';
        break;
      case 'y':
        secondArg = 'years';
        break;
      default:
        break;
    }
    return moment().add(firstArg, secondArg);
  } else {
    return moment();
  }
}

module.exports = {
  convertDateFormat,
  addItem2XML,
  parseQuery
}
