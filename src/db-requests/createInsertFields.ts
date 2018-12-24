import { IUserInsertArgument } from "../models/argument";

export function createInsertFields(user: IUserInsertArgument) {
    return {
        name: user.name,
        gender: user.gender,
        rank: user.rank,
    };
}
