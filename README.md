# Date formatter for Alfred Workflow

## Installation
- create an alfred workflow and select `script filter`
  + double click script filter
    * enter `/usr/local/bin/node ./index.js {query}` in Script
    * use teriminal to open workflow folder
      - move the `info.plist`
      - run `git clone https://github.com/cyrusn/date-formatter-alfred-workflow.git .`
      - run `npm install`
- select `copy to Clipboard` as outputs

## Run in Alfred
- use `date` as command
