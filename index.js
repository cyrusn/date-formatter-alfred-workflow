#!/usr/bin/env node
'use strict';

const query = process.argv[2];
const moment = require('moment');
const Builder = require('xmlbuilder');
const Formatter = require('chinese-date-formatter');
const xml = Builder.create('items');

function addItem2XML (date, tool, format, locale) {
  if (!locale) {
    locale = 'en';
  }

  switch (tool) {
    case 'chinese-date-formatter':
      date = (new Formatter(date))[format];
      break;
    case 'moment':
      date = date.locale(locale).format(format);
      break;
    default:
      // do nothing ...
  }

  xml
  .ele('item')
  .att('arg', date)
  .att('uid', date)
  .ele('title', date);
  return xml;
}

function parseQuery (query) {
  // console.log(/[0-9]/.test(query));
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

const formatList = [{
  tool: 'chinese-date-formatter',
  format: 'full'
}, {
  tool: 'chinese-date-formatter',
  format: 'simple'
}, {
  tool: 'moment',
  format: 'ddd, D MMM YY'
}, {
  tool: 'moment',
  format: 'D.M.YY (dd)'
}, {
  tool: 'moment',
  format: 'DD/MM/YY (dd)'
}, {
  tool: 'moment',
  format: 'YYYY-MM-DD'
}, {
  tool: 'moment',
  format: 'YYYY年M月D日 (dd)',
  locale: 'zh-tw'
}, {
  tool: 'moment',
  format: 'D.M.YY (dd)',
  locale: 'zh-tw'
}];

const parsedQuery = parseQuery(query);
formatList.forEach(format => {
  addItem2XML(parsedQuery, format.tool, format.format, format.locale);
});

console.log(xml.end({
  pretty: true
}));

module.exports = {addItem2XML}
