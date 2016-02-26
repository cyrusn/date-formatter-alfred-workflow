'use strict';
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
function parseQuery (argv) {
  let parseDate = moment();
  const dateString = /(\d{1,2})[\.|\-|\/](\d{1,2})[\.|\-|\/]?(\d{2,4})?/;

  if (isNaN(argv._)) {
    if (dateString.test(argv._)) {
      parseDate = moment(argv._, 'DD-MM-YYYY');
    }
  } else if (argv._ < moment().date()) {
    parseDate
      .date(argv._)
      .add(1, 'months');
  } else {
    parseDate
      .date(argv._);
  }

  parseDate
    .add(argv.d, 'days')
    .add(argv.m, 'months')
    .add(argv.w, 'weeks')
    .add(argv.q, 'quarters')
    .add(argv.y, 'years');

  return parseDate;
}

module.exports = {
  convertDateFormat,
  addItem2XML,
  parseQuery
};
