import { resolveMaker, resolveMakers } from "../resolvers/maker-resolver";
import { resolveOrder, resolveOrders } from "../resolvers/order-resolver";
import { resolveProduct, resolveProducts } from "../resolvers/product-resolver";
import { resolveUser, resolveUsers } from "../resolvers/user-resolver";
import { IdArgument, MakerArgument, OrderArgument, ProductArgment, UserArgument, UserInsertArgument } from "./argument";
import {
    Maker,
    MakerConnection,
    Order,
    OrderConnection,
    Product,
    ProductConnection,
    User,
    UserConnection,
} from "./query-type";

const userQueries = {
    user: {
        type: User,
        args: IdArgument,
        resolve: resolveUser,
    },

    users: {
        type: UserConnection,
        args: UserArgument,
        resolve: resolveUsers,
    },
};

const makerQueries = {
    maker: {
        type: Maker,
        args: IdArgument,
        resolve: resolveMaker,
    },

    makers: {
        type: MakerConnection,
        args: MakerArgument,
        resolve: resolveMakers,
    },
};

const productQueries = {
    product: {
        type: Product,
        args: IdArgument,
        resolve: resolveProduct,
    },

    products: {
        type: ProductConnection,
        args: ProductArgment,
        resolve: resolveProducts,
    },
};

const orderQueries = {
    order: {
        type: Order,
        args: IdArgument,
        resolve: resolveOrder,
    },

    orders: {
        type: OrderConnection,
        args: OrderArgument,
        resolve: resolveOrders,
    },
};

export default {
    ...userQueries,
    ...makerQueries,
    ...productQueries,
    ...orderQueries,
};
