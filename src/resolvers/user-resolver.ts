import * as Sql from "../db-requests/user-sql";
import {
    resolveInsert,
    resolveItems,
    resolvePrimary,
    resolveUpdate,
    toConnectionType,
} from "../helpers/resolve-helper";
import {
    createInsertSql,
    createLastInsertIdSql,
    createSelectCountSql,
    createSelectSql,
    createUpdateSql,
} from "../helpers/sql-helper";

export function resolveUser(parent: any, args: any, context: any) {
    return resolvePrimary({
        context,
        selectSql: createSelectSql({
            from: Sql.from,
            fields: Sql.fields,
            where: Sql.createWhereId(args),
        }),
    });
}

export async function resolveUsers(parent: any, args: any, context: any) {
    const result = await resolveItems({
        context,
        selectSql: createSelectSql({
            from: Sql.from,
            fields: Sql.fields,
            where: Sql.createWhere(args),
        }),
        selectCountSql: createSelectCountSql({
            from: Sql.from,
            where: Sql.createWhere(args),
        }),
    });

    return toConnectionType(result.items, result.totalCount, args);
}

export function resolveUserByParentId(parent: any, args: any, context: any) {
    return resolvePrimary({
        context,
        selectSql: createSelectSql({
            from: Sql.from,
            fields: Sql.fields,
            where: Sql.createWhereId({ id: parent.userId }),
        }),
    });
}

export async function createUser(parent: any, args: any, context: any) {
    const user = args.user;

    const lastId = await resolveInsert({
        context,
        insertSqls: [
            createInsertSql({
                from: Sql.from,
                values: Sql.createInsertFields(user),
            }),
        ],
        lastIdSql: createLastInsertIdSql(Sql.from),
    });

    return await resolveUser({}, { id: lastId }, context);
}

export async function updateUser(parent: any, args: any, context: any) {
    const user = args.user;

    await resolveUpdate({
        context,
        updateSqls: [
            createUpdateSql({
                from: Sql.from,
                values: Sql.createInsertFields(user),
                where: [ `id=${user.id}` ],
            }),
        ],
    });

    return await resolveUser({}, { id: user.id }, context);
}
