set charset utf8;
set character_set_client='utf8';
set character_set_connection='utf8';
set character_set_database='utf8';
set character_set_results='utf8';
set character_set_server='utf8';

insert into `users` values (
    1,
    "ひよこや",
    "male",
    "premium"
);

insert into `users` values (
    2,
    "はなこ",
    "female",
    "general"
);

insert into `products` values (
    1,
    "ドラム式洗濯機",
    "A-100",
    34000,
    1
);

insert into `products` values (
    2,
    "格安洗濯機",
    "A-101",
    14000,
    1
);

insert into `products` values (
    3,
    "有機ELの4Kテレビ",
    "B-100",
    84000,
    2
);

insert into `products` values (
    4,
    "ハードディスク内蔵テレビ",
    "B-101",
    53000,
    2
);

insert into `makers` values (
    1,
    "マルビシ電気工房"
);

insert into `makers` values (
    2,
    "マツウエ電気"
);

insert into `orders` values (
    1,
    100000,
    1
);

insert into `orders` values (
    2,
    130000,
    1
);

insert into `order_product` values (
    1,
    1,
    1
);

insert into `order_product` values (
    2,
    1,
    3
);
