import { IIdArgument, IProductArgument } from "../models/argument";

export const from = "products";

export const fields = {
    id: "id",
    name: "name",
    model_number: "modelNumber",
    price: "price",
    maker_id: "makerId",
};

export function createWhereId(query: IIdArgument) {
    const where = new Array<string>();

    if (query.id !== undefined) {
        where.push(`id=${query.id}`);
    }

    return where;
}

export function createWhereIdList(idList: string[]) {
    return idList.length > 0 ? [`id in (${idList.join(",")})`] : [];
}

export function createWhere(query: IProductArgument) {
    const where = createWhereId(query);

    if (query.name !== undefined) {
        where.push(`name="${query.name}"`);
    }
    if (query.modelNumber !== undefined) {
        where.push(`model_number="${query.modelNumber}"`);
    }
    if (query.price !== undefined) {
        if (query.price.min !== undefined) {
            where.push(`price>=${query.price.min}`);
        }
        if (query.price.max !== undefined) {
            where.push(`price<=${query.price.max}`);
        }
    }

    return where;
}
