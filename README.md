# Date formatter for Alfred Workflow

## Installation
- create an alfred workflow and select `script filter` as input
  + double click `script filter`
    * enter `/usr/local/bin/node ./index.js {query}` in Script
    * use teriminal to open workflow folder
      - remove the `info.plist`
      - run `git clone https://github.com/cyrusn/date-formatter-alfred-workflow.git .`
      - run `npm install`
- restart alfred

## Example

- `d` => show today
- `d 21` => show the date of coming 21st
- `d 12-12-2016` => show the date of 12 Dec 2016

you can add and subtract days, months, weeks, quaters and years on specified date
- `d -d 5` => show the date 5 days later of today
- `d 13 -w -3` => show the date 3 weeks before coming 13th
- `d 12-12 -q 3` => show the date 3 quarter later of coming 12/12
- `d 12-12-2014 -y 1` => show the date 1 year later 12/12/2014
- `d -d 1 -w 2 -y 1` => show the 1 day, 2 weeks and 1 year later of today
