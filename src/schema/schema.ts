import { GraphQLObjectType, GraphQLSchema, printSchema } from "graphql";
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

console.log(printSchema(schema));

export default schema;
