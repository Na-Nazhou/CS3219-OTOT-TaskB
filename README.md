# CS3219 OTOT Task B

[![Build Status](https://travis-ci.org/Na-Nazhou/CS3219-OTOT-TaskB.svg?branch=master)](https://travis-ci.org/Na-Nazhou/CS3219-OTOT-TaskB)
[![Coverage Status](https://coveralls.io/repos/github/Na-Nazhou/CS3219-OTOT-TaskB/badge.svg?branch=master)](https://coveralls.io/github/Na-Nazhou/CS3219-OTOT-TaskB?branch=master)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2b95cdcdc8d45e8928ee/test_coverage)](https://codeclimate.com/github/Na-Nazhou/CS3219-OTOT-TaskB/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/2b95cdcdc8d45e8928ee/maintainability)](https://codeclimate.com/github/Na-Nazhou/CS3219-OTOT-TaskB/maintainability)

# Setting up dev environment

- Create a `.env` file at the root of the directory and copy the content of `.env.example` to that file. You may modify the database user and password accordingly. 
- Run `npm i` to install the dependencies. 
- Run `brew services start postgresql` to make sure PostgresQL is running. If you are not on macOS, you may use other commands to start PostgresQL.
- Run `createdb quotes_development` to create the database for development.
- Run `createdb quotes_test` to create the database for test. 
- Run `sequelize db:migrate` to run database migration. 
- Run `npm run dev` to start the server. 

# Manual Deployment

- Run `export NODE_ENV=production`
- Run `sequelize db:migrate` if needed (`DATABASE_URL` must be configured correctly)
- Run `npm run prestart`
- Run `sls deploy`

## References: 
- https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/
- https://medium.com/@victorsteven/restful-api-with-nodejs-express-postgresql-sequelize-travis-mocha-coveralls-and-code-climate-f28715f7a014
- https://mattwelke.com/2019/01/06/free-tier-managed-sql-with-aws-lambda-and-heroku-postgres.html