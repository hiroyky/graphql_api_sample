import * as OrderProductSql from "../db-requests/order-product-sql";
import * as Sql from "../db-requests/product-sql";
import { resolveItems, resolvePrimary, toConnectionType } from "../helpers/resolve-helper";
import { createSelectCountSql, createSelectSql } from "../helpers/sql-helper";
import { IOrderProductArgument } from "../models/argument";

export function resolveProduct(parent: any, args: any, context: any) {
    return resolvePrimary({
        context,
        selectSql: createSelectSql({
            from: Sql.from,
            fields: Sql.fields,
            where: Sql.createWhereId(args),
        }),
    });
}

export async function resolveProducts(parent: any, args: any, context: any) {
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

export async function resolveProductsByRelatedOrder(parent: any, args: any, context: any) {
    const orderProductArg: IOrderProductArgument = {
        orderId: parent.id ,
        limit: args.limit,
        offset: args.offset,
    };

    const relation = await resolveItems({
        context,
        selectSql: createSelectSql({
            from: OrderProductSql.from,
            fields: OrderProductSql.fields,
            where: OrderProductSql.createWhere(orderProductArg),
        }),
        selectCountSql: createSelectCountSql({
            from: OrderProductSql.from,
            where: OrderProductSql.createWhere(orderProductArg),
        }),
    });

    const productIdList = relation.items.map((i) => i.productId);
    const items = await resolveItems({
        context,
        selectSql: createSelectSql({
            from: Sql.from,
            fields: Sql.fields,
            where: Sql.createWhereIdList(productIdList),
        }),
        selectCountSql: createSelectCountSql({
            from: Sql.from,
            where: Sql.createWhereIdList(productIdList),
        }),
    });

    return toConnectionType(items.items, relation.totalCount, args);
}
