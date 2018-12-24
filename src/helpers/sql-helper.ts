import squel from "squel";
import { IConnectionArgument } from "../models/argument";

export function createSelectSql<T>(arg: {
    from: string,
    fields: { [field: string]: string } | string[],
    where: string[],
    connection?: IConnectionArgument,
}) {

    const sql = squel.select().from(arg.from).fields(arg.fields);
    arg.where.forEach((w) => sql.where(w));

    if (arg.connection) {
        if (arg.connection.limit !== undefined) {
            sql.limit(arg.connection.limit);
        }
        if (arg.connection.offset !== undefined) {
            sql.limit(arg.connection.offset);
        }
    }

    return sql.toString();
}

export function createSelectCountSql<T>(arg: {
    from: string,
    where: string[],
}) {

    const sql = squel.select()
        .from(arg.from)
        .fields({
            "count(*)": "count",
        });

    arg.where.forEach((w) => sql.where(w));

    return sql.toString();
}

export function createInsertSql(arg: {
    from: string,
    values: { [field: string]: string|undefined },
}) {

    return squel
        .insert()
        .into(arg.from)
        .setFields(arg.values)
        .toString();
}

export function createLastInsertIdSql(from: string) {
    return squel
        .select()
        .field("max(id) as lastId")
        .from(from)
        .toString();
}

export function createUpdateSql(arg: {
    from: string,
    values: { [field: string]: string|undefined },
    where: string[];
}) {

    const sql = squel
        .update()
        .table(arg.from)
        .setFields(arg.values);

    arg.where.forEach((w) => sql.where(w));

    return sql.toString();
}
