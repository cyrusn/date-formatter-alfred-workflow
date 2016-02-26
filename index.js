#!/usr/bin/env node
'use strict';
const argv = require('yargs').number(['_']).argv;
const FormatList = require('./config');
const addItem2XML = require('./lib').addItem2XML;
const parseQuery = require('./lib').parseQuery;
const convertDateFormat = require('./lib').convertDateFormat;
const Builder = require('xmlbuilder');
const xml = Builder.create('items');

run();

function run () {
  const parsedQuery = parseQuery(argv);
  FormatList.forEach(format => {
    const date = convertDateFormat(parsedQuery, format);
    addItem2XML(xml, date);
  });

  console.log(xml.end({
    pretty: true
  }));
}
