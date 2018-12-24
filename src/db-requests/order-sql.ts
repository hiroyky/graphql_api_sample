import { IIdArgument, IOrderArgument } from "../models/argument";

export const from = "orders";

export const fields = {
    id: "id",
    order_date: "orderDate",
    user_id: "userId",
};

export function createWhereId(query: IIdArgument) {
    const where = new Array<string>();

    if (query.id !== undefined) {
        where.push(`id=${query.id}`);
    }

    return where;
}

export function createWhere(query: IOrderArgument) {
    const where = createWhereId(query);

    if (query.orderDate !== undefined) {
        if (query.orderDate.min !== undefined) {
            where.push(`price>=${query.orderDate.min}`);
        }
        if (query.orderDate.max !== undefined) {
            where.push(`price<=${query.orderDate.max}`);
        }
    }

    return where;
}
