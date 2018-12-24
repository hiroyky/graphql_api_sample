export interface IConnection<T> {
    totalCount: number;
    pageInfo: {
        hasPreviousPage: boolean,
        hasNextPage: boolean,
    };
    edges: Array<{ node: T }>;
}
