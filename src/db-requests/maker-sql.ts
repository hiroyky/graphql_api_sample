import { IIdArgument, IProductArgument } from "../models/argument";

export const from = "makers";

export const fields = {
    id: "id",
    name: "name",
};

export function createWhereId(query: IIdArgument) {
    const where = new Array<string>();

    if (query.id !== undefined) {
        where.push(`id=${query.id}`);
    }

    return where;
}

export function createWhere(query: IProductArgument) {
    const where = createWhereId(query);

    if (query.name !== undefined) {
        where.push(`name="${query.name}"`);
    }

    return where;
}
