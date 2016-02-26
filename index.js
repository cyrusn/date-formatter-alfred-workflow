#!/usr/bin/env node
'use strict';

const query = process.argv[2];
const FormatList = require('./config');
const addItem2XML = require('./lib').addItem2XML;
const parseQuery = require('./lib').parseQuery;
const convertDateFormat = require('./lib').convertDateFormat;
const Builder = require('xmlbuilder');
const xml = Builder.create('items');

run();

function run () {
  const parsedQuery = parseQuery(query);
  FormatList.forEach(format => {
    const date = convertDateFormat(parsedQuery, format);
    addItem2XML(xml, date);
  });

  console.log(xml.end({
    pretty: true
  }));
}
