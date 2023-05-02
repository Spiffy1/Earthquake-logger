<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

This service collect & provide latest information on earth quake

Main code quality packages are linter, sonarjs, cspell, betterer.  
Further quality procedures such as commit lint, sentry will be added later on.

## Installation

```bash
$ npm install
```

## Deployment

```bash
# Build image
docker build . -t usgs-fetcher
# Deploy service
docker run usgs-fetcher
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Before Commit

```bash
# check code convention
$ npm run lint
# check spelling
$ npm run cspell
# check code quality with betterer
$ npm run betterer
# find unused exports
$ npx find-unused-exports

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Sentry log

## Swagger

[Link](http://localhost:3000/api/)

## Curl

```bash

# Pull data from USGS
curl --location --request POST 'http://localhost:3000/earthquake/pull-origin?recordCount=100'

# Query With time of occurence & magnitude range
curl --location --request GET 'http://localhost:3000/earthquake/get-geolog?startTime=1660107819014&endTime=1660119239634&limit=50&lastEvaluatedPKey=Earth2022&lastEvaluatedSKey=1660119215874&minMag=1&maxMag=9'

# Get Average magnitude per month within last year
curl --location --request GET 'http://localhost:3000/earthquake/average-mag'
```

## Todo

[x] - Prepare Dev Env  
[x] - Dockerize & package service  
[x] - Setup standard code quality/rules with linter  
[x] - Check code smell & cognitive complexity with sonarjs  
[x] - Setup spell checker  
[x] - Setup standard code quality check with betterer  
[x] - Build an endpoint that fetches and stores the 100 most recent earthquakes into the database  
[x] - Build a paginated endpoint to list earthquakes from the database, where multiple filters can be applied.  
[x] - Build a reusable system to collect request information  
[x] - Apply the data collection system to the first two endpoints  
[x] - Build an endpoint to query the data collected from the previous task over a timescale.  
[x] - Describe without implementing how this system could be refactored to handle 500 requests per second  
[ ] - Handle Error  
[ ] - Show testing methodoloy

## Optional

[x] - DynamoDB  
[x] - NoSQL database design  
[ ] - OpenAPI Documentation  
[ ] - JWT based authentication  
[ ] - Performance tuning  
[ ] - Insert using batch request

## Reference

[Check Cognitive complexity with Sonarqube](https://www.sonarsource.com/resources/cognitive-complexity/)  
[Incremental Development with Betterer](https://phenomnomnominal.github.io/betterer/docs/introduction)

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Phan Nguyen](phannt@techvify.com.vn)

## License

Nest is [MIT licensed](LICENSE).
