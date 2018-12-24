
import graphqlHTTP from "express-graphql";
import MySqlDriver from "./drivers/mysql-driver";
import schema from "./schema/schema";

export default function getGraphQLHttp(db: MySqlDriver) {

    return graphqlHTTP(() => ({
        graphiql: true,
        schema,
        context: { db },
    }));
}
