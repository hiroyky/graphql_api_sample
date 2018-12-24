import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { connectionDefinitions } from "graphql-relay";
import { resolveByParentMakerId } from "../resolvers/maker-resolver";
import { resolveProductsByRelatedOrder } from "../resolvers/product-resolver";
import { resolveUserByParentId } from "../resolvers/user-resolver";
import { ConnectionArgument } from "./argument";
import { GenderEnum, MemberRank } from "./enum-type";

export const User = new GraphQLObjectType({
    name: "User",
    description: "お客様の情報",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        gender: { type: GenderEnum, description: "性別" },
        rank: { type: MemberRank, description: "会員ランク" },
        orders: { type: OrderConnection },
    }),
});

export const Product = new GraphQLObjectType({
    name: "Product",
    description: "商品",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString, description: "商品名" },
        modelNumber: { type: GraphQLString, description: "型番" },
        price: { type: GraphQLInt, description: "販売価格" },
        maker: {
            type: Maker,
            resolve: resolveByParentMakerId,
        },
    }),
});

export const Maker = new GraphQLObjectType({
    name: "Maker",
    description: "製造業者",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        products: { type: ProductConnection },
    }),
});

export const Order = new GraphQLObjectType({
    name: "Order",
    description: "受注情報",
    fields: () => ({
        id: { type: GraphQLID },
        orderDate: { type: GraphQLInt, description: "受注日時(UNIX TIME)" },
        user: {
            type: User,
            description: "注文したユーザ",
            resolve: resolveUserByParentId,
        },
        products: {
            type: ProductConnection,
            args: ConnectionArgument,
            description: "注文に含まれた商品",
            resolve: resolveProductsByRelatedOrder,
        },
    }),
});

export const { connectionType: UserConnection } = connectionDefinitions({
    name: "UserConnection",
    nodeType: User,
});

export const { connectionType: ProductConnection } = connectionDefinitions({
    name: "ProductConnection",
    nodeType: Product,
});

export const { connectionType: MakerConnection } = connectionDefinitions({
    name: "MakerConnection",
    nodeType: Maker,
});

export const { connectionType: OrderConnection } = connectionDefinitions({
    name: "OrderConnection",
    nodeType: Order,
});
