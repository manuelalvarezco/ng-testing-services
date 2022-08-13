# NgTestingServices

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running test coverage

Run `ng test --no-watch --code-coverage` to execute the unit tests via Coverage report

## Add karma-mocha-reporter

Run `npm i karma-mocha-reporter --save-dev` to execute the unit tests via mocha

## Config karma-mocha-reporter

Run `npm i karma-mocha-reporter --save-dev` to execute the unit tests via mocha

plugins: [
      ...,
      require('karma-mocha-reporter')
],

reporters: ['mocha']
