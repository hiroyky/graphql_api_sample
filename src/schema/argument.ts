import { GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLString } from "graphql";
import { GenderEnum, MemberRank } from "./enum-type";

const RangeIntType = new GraphQLInputObjectType({
    name: "RangeInt",
    fields: () => ({
        min: { type: GraphQLInt },
        max: { type: GraphQLInt },
    }),
});

export const IdArgument = {
    id: { type: GraphQLID },
};

export const ConnectionArgument = {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt, defaultValue: 0 },
};

export const UserArgument = {
    ...IdArgument,
    ...ConnectionArgument,
    name: { type: GraphQLString },
    gender: { type: GenderEnum },
    rank: { type: MemberRank },
};

export const UserInsertArgument = new GraphQLInputObjectType({
    name: "UserInputArgument",
    fields: () => ({
        name: { type: new GraphQLNonNull(GraphQLString) },
        gender: { type: new GraphQLNonNull(GraphQLString) },
        rank: { type: GraphQLString },
    }),
});

export const UserUpdateArgument = new GraphQLInputObjectType({
    name: "UserUpdateArgument",
    fields: () => ({
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        gender: { type: GraphQLString },
        rank: { type: GraphQLString },
    }),
});

export const ProductArgment = {
    ...IdArgument,
    ...ConnectionArgument,
    name: { type: GraphQLString },
    modelNumber: { type: GraphQLString },
    price: { type: RangeIntType },
};

export const MakerArgument =  {
    ...IdArgument,
    ...ConnectionArgument,
    name: { type: GraphQLString },
};

export const OrderArgument = {
    ...IdArgument,
    ...ConnectionArgument,
    orderDate: { type: RangeIntType },
};
