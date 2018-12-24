import { IIdArgument, IUserInsertArgument, IUserQueryArgument } from "../models/argument";

export const from = "users";

export const fields = [
    "id",
    "name",
    "gender",
    "rank",
];

export function createWhereId(query: IIdArgument) {
    const where = new Array<string>();

    if (query.id !== undefined) {
        where.push(`id=${query.id}`);
    }

    return where;
}

export function createWhere(query: IUserQueryArgument) {
    const where = createWhereId(query);

    if (query.name !== undefined) {
        where.push(`name="${query.name}"`);
    }
    if (query.gender !== undefined) {
        where.push(`id="${query.gender}"`);
    }
    if (query.rank !== undefined) {
        where.push(`id=${query.rank}`);
    }

    return where;
}

export function createInsertFields(user: IUserInsertArgument) {
    const values: {[key: string]: any} = {};

    if (user.name !== undefined) {
        values.name = user.name;
    }
    if (user.gender !== undefined) {
        values.gender = user.gender;
    }
    if (user.rank !== undefined) {
        values.rank = user.rank;
    }

    return values;
}
