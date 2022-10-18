# Apollo Local Federation

Repository to quickly test GraphQL schema federation locally

## Setup

```shell
npm install
```

## Start

Run these commands in separate consoles

```shell
npm run start-service-1
npm run start-service-2
npm run start-gateway
```

## Modifications

To update GraphQL definition `typeDefs` variable of `service-1`, go to [service-1](services/service-1/index.js)

To update GraphQL definition `typeDefs` variable of `service-2`, go to [service-2](services/service-2/index.js)

To add more services, simply copy over `service-1` folder and add new service to the gateway in [gateway.js](gateway.js)

For each service, make sure to update the `resolvers` variable to match your new definition
