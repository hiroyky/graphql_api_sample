import { GraphQLNonNull } from "graphql";
import { createUser, updateUser } from "../resolvers/user-resolver";
import { UserInsertArgument, UserUpdateArgument } from "./argument";
import { User } from "./query-type";

const userMutations = {
    createUser: {
        type: User,
        args: {
            user: {
                type: new GraphQLNonNull(UserInsertArgument),
            },
        },
        resolve: createUser,
    },

    updateUser: {
        type: User,
        args: {
            user: {
                type: new GraphQLNonNull(UserUpdateArgument),
            },
        },
        resolve: updateUser,
    },

};

export default {
    ...userMutations,
};
