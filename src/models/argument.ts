export interface IRange {
    min?: number;
    max?: number;
}

export interface IConnectionArgument {
    limit?: number;
    offset: number;
}

export interface IIdArgument {
    id?: number | string;
}

interface IUserArgument {
    name?: string;
    gender?: string;
    rank?: string;
}

export type IUserQueryArgument = IUserArgument & IIdArgument & IConnectionArgument;
export type IUserInsertArgument = IUserArgument;

export interface IProductArgument extends IIdArgument, IConnectionArgument {
    name?: string;
    modelNumber?: string;
    price?: IRange;
}

export interface IMakerArgument extends IIdArgument, IConnectionArgument {
    name?: string;
}

export interface IOrderArgument extends IIdArgument, IConnectionArgument {
    orderDate?: IRange;
}

export interface IOrderProductArgument extends IIdArgument, IConnectionArgument {
    productId?: number;
    orderId?: number;
}
