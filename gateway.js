import {ApolloGateway, IntrospectAndCompose} from "@apollo/gateway";
import {ApolloServer} from "apollo-server";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";

const gateway = new ApolloGateway({
   supergraphSdl: new IntrospectAndCompose({
       subgraphs: [
           { name: "service-1", url: "http://localhost:4001" },
           { name: "service-2", url: "http://localhost:4002" }
       ]
   }),
    __exposeQueryPlanExperimental: false,
});

const server = new ApolloServer({
    gateway,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
});

server
    .listen({
        port: 4000
    })
    .then(({ url }) => {
        console.log(`🚀 Gateway ready at ${url}`);
    })
    .catch((err) => {
        console.error(err);
    });
