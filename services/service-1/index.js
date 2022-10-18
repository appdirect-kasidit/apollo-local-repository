import { ApolloServer, gql } from "apollo-server";
import { buildSubgraphSchema } from "@apollo/subgraph";

// Modify your GraphQL here
const typeDefs = gql`
    extend schema @link(
        url: "https://specs.apollo.dev/federation/v2.0",
        import: ["@override", "@shareable", "@key"])

    type Query {
        subscription(id: ID!): SubscriptionDefinition @shareable
    }

    type SubscriptionDefinition @key(fields: "id") @shareable {
        id: ID!
        status: String!
        version: Int!
        activeCharge: MainBillingCharge! @override(from: "service-2")
    }
    
    type MainBillingCharge @shareable {
        subscriptionId: ID!
        status: String! 
    }
`;

const billingCharges = [{
    subscriptionId: 1,
    status: 'ACTIVE'
}]

const subscriptions = [{
    id: 1,
    status: 'ACTIVE',
    version: 1
}];

const resolvers = {
    Query: {
        subscription: (_, { id }) => {
            console.log(`resolving subscription by id '${id}' at node 1`)
            return subscriptions.find(subscription => subscription.id == id);
        }
    },

    SubscriptionDefinition: {
        activeCharge: ({ id }) => {
            console.log(`resolving billing charge by subscription id '${id}' at node 1`)
            return billingCharges.find(charge => charge.subscriptionId == id);
        }
    }
}

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers })
});

server.listen({ port: 4001 }).then(() => {
    console.log('service-1 started');
});
