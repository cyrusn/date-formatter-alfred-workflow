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

- `date` => show today
- `date 21` => show the date of coming 21st
- `date 5d` => show the date 5 days later
- `date -3w` => show the date 3 weeks before
- `date 12-12-2016` => show the date of 12 Dec 2016
