## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
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

## Migrations

The local migrations must be run on command line
The prod ones will work from the dist build on startup

```bash
# generate new
$ npm run typeorm:migration:generate initWoohoo

# run the migrations
$ npm run typeorm:migration:run
```

## deploying

```bash
# push to remote
git push
```

```shell
git push dokku main:master
```

## ssh in

```
ssh -i ~/.ssh/digioceanMacbook root@165.232.148.97

dokku apps:list

dokku config:show coin-bots

dokku config:set coin-bots AUTH0_DOMAIN=dev-1degfvs2.au.auth0.com KEY=VAL


```
