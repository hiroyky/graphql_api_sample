import { IOrderProductArgument } from "../models/argument";

export const from = "order_product";

export const fields = {
    id: "id",
    product_id: "productId",
    order_id: "orderId",
};

export function createWhere(query: IOrderProductArgument) {
    const where = new Array<string>();

    if (query.productId !== undefined) {
        where.push(`product_id=${query.productId}`);
    }
    if (query.orderId !== undefined) {
        where.push(`order_id=${query.orderId}`);
    }

    return where;
}
