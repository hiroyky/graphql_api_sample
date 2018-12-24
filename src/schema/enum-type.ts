import { GraphQLEnumType } from "graphql";

export const GenderEnum = new GraphQLEnumType({
    name: "Gender",
    description: "性別",
    values: {
        male: { value: "male", description: "男性" },
        female: { value: "female", description: "女性" },
        other: { value: "other", description: "その他" },
    },
});

export const MemberRank = new GraphQLEnumType({
    name: "MemberRank",
    description: "会員ランク",
    values: {
        general: { value: "general", description: "一般会員" },
        gold: { value: "gold", description: "ゴールド会員" },
        platinum: { value: "platinum", description: "プラチナ会員" },
    },
});
