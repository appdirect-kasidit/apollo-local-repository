import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

// Modify your GraphQL here
const typeDefs = gql`
    extend schema @link(
        url: "https://specs.apollo.dev/federation/v2.0",
        import: ["@override", "@shareable", "@key", "@inaccessible"])

    type Query {
        subscription(id: ID!): SubscriptionDefinition @override(from: "service-1")
    }
    
    type SubscriptionDefinition @key(fields: "id") @shareable {
        id: ID!
        status: String!
        version: Int!
        uuid: String! @inaccessible
        activeCharge: MainBillingCharge
    }
    
    type MainBillingCharge @shareable {
        id: ID! @inaccessible
    }
`

const subscriptions = [{
    id: 1,
    status: 'FINISHED',
    version: 2,
    uuid: 'my-test-uuid'
}];

const resolvers = {
    Query: {
        subscription: (_, { id }) => {
            console.log(`resolving subscription by id '${id}' at node 2`)
            return subscriptions.find(subscription => subscription.id == id);
        }
    }
}

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers })
});

server.listen({ port: 4002 }).then(() => {
    console.log('service-2 started');
});
