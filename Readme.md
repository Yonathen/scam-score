## Objective

One of our product teams wants to build a new service which creates a “SCAMscore” for any provided domain. The “SCAMscore” should indicate from 0 (very likely legit) to 100 (very likely a scam) how likely a domain is scam. To be able to analyze and follow up on trends of a “SCAMscore” the service should be able to retrieve data sets from prior requests. In a first iteration of this service we want to rely exclusively upon the information provided by VirusTotal.

## Requirements
- Clients can pass any domain to the service and should retrieve a “SCAMscore” for it
- The SCAMscore will be calculated as following: ```100 / (totalResults - undetected - timeout) * (malicious + suspicious)```
- Have a look at last_analysis_stats attribute of the URL object to learn more about those values
- Additionally clients can add a time range to the request to see a trend of the score over time
- Every result of a domain must be stored in a database with the actual time of the request for later analysis
- Service should be built with Node.js (TypeScript) and should use PostgresSQL as database

## Installation
- Execute ```https://github.com/Yonathen/scam-score.git```
- Access the project with ```cd scam-score```
- Install the app with ```yarn install```

## Available Scripts

In the project directory, you can run:

### `yarn start:dev`

- Runs the app in the development mode.\
- Open [http://localhost:3001](http://localhost:3001) in post man and use the following postman collection from root folder
  - Post man collection : [ScamScore.postman_collect.json](ScamScroe.postman_collection.json)
- Or use the following curl command
  - ```curl --request GET 'localhost:3001/scamscore?url=http://google.com'```
  - ```curl --request GET 'localhost:3001/analyses'```
  - ```curl --request GET 'localhost:3001/analyses/range?from=2022-03-20T01:54:47.997Z&2022-03-25T01:54:47.997Z```


### `yarn test:unit`

Launches the unit test in interactive manner.

## Documentation

- Swagger Documentation : http://localhost:3001/docs

## External API Endpoints

-   Virus Total: https://developers.virustotal.com/reference/url-info
-   Database: postgres://yfkywvje:6yQcuqDEuULXYACy_vMxlxrllQMqMEwo@hattie.db.elephantsql.com/yfkywvje
