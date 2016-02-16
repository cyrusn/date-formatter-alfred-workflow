const addItem2XML = require('../lib').addItem2XML;
const parseQuery = require('../lib').parseQuery;
const convertDateFormat = require('../lib').convertDateFormat;
const test = require('tape');
const moment = require('moment');
const FormatList = require('../config');

const answers = [
  '二零一六年二月二十六日',
  '二月二十六日',
  'Fri, 26 Feb 16',
  '26.2.16 (Fr)',
  '26/02/16 (Fr)',
  '2016-02-26',
  '2016年2月26日 (五)',
  '26.2.16 (五)'
]

test('convert date test', function (t) {
  t.plan(8)
  const date = moment('2016-2-26', 'YYYY-M-D');

  FormatList.forEach(function (format, i) {
    const chtDate = convertDateFormat(date, format)
    t.equal(chtDate, answers[i], `${format.tool} | ${format.format} | ${format.locale}`)
  })
})
