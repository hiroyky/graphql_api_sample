import { GraphQLObjectType, GraphQLSchema } from "graphql";
import mutations from "./mutations";
import queries from "./queries";

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "GraphQLSampleQueries",
        fields: () => ({
            ...queries,
        }),
    }),

    mutation: new GraphQLObjectType({
        name: "GraphQLSampleMutations",
        fields: () => ({
            ...mutations,
        }),
    }),
});

export default schema;
