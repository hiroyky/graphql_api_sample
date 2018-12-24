import MySqlDriver from "../drivers/mysql-driver";
import { IConnectionArgument } from "../models/argument";
import { IConnection } from "../models/connection";

interface ResolvePrimaryParam<T> {
    context: { db: MySqlDriver };
    selectSql: string;
    resultResolveFunc?: (row: any) => T;
}

interface ResolveItemsParam<T> extends ResolvePrimaryParam<T> {
    selectCountSql: string;
}

interface ResolveInsertParam {
    context: { db: MySqlDriver };
    insertSqls: string[];
    lastIdSql?: string;
}

interface ResolveUpdateParam<T> {
    context: { db: MySqlDriver };
    updateSqls: string[];
    resultResolveFunc?: (row: any) => T;
}

export async function resolvePrimary<T>(param: ResolvePrimaryParam<T>): Promise<T> {
    const db = param.context.db;
    const results: any[] = await db.query(param.selectSql);

    const data = param.resultResolveFunc ?
        resolveResults(results, param.resultResolveFunc) :
        results;

    return data[0];
}

export async function resolveItems<T>(param: ResolveItemsParam<T>) {
    const db = param.context.db;
    const results: any[] = await db.query(param.selectSql);
    const totalCount: number = await db.query(param.selectCountSql);

    const items = param.resultResolveFunc ?
        resolveResults(results, param.resultResolveFunc) :
        results;

    return { items, totalCount };
}

export function toConnectionType<T>(items: T[], totalCount: number, args: IConnectionArgument): IConnection<T> {
    const hasPreviousPage = args.limit === undefined ?
        args.offset > 0 :
        (args.offset + 1) - args.limit > 0;
    const hasNextPage = totalCount > (args.offset - 1) + items.length;

    return {
        totalCount,
        pageInfo: {
            hasPreviousPage,
            hasNextPage,
        },
        edges: items.map((i) => ({
            node: i,
        })),
    };
}

export async function resolveInsert(param: ResolveInsertParam) {
    const db = param.context.db;
    await db.beginTransaction();
    await Promise.all(param.insertSqls.map(async (sql) => await db.query(sql)));
    const givenId = param.lastIdSql !== undefined ? await db.query(param.lastIdSql) : undefined;
    await db.commit();

    return givenId[0].lastId;
}

export async function resolveUpdate<T>(param: ResolveUpdateParam<T>) {
    const db = param.context.db;
    await db.beginTransaction();
    await Promise.all(param.updateSqls.map(async (sql) => await db.query(sql)));
    await db.commit();
}

function resolveResults<T>(result: any[], resultResolveFunc: (row: any) => T): T[] {
    return result.map((row) => resultResolveFunc(row));
}
