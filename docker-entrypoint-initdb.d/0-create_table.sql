set charset utf8;
set character_set_client='utf8';
set character_set_connection='utf8';
set character_set_database='utf8';
set character_set_results='utf8';
set character_set_server='utf8';

drop table if exists `users`;
create table `users` (
    `id` int not null auto_increment,
    `name` text,
    `gender` text,
    `rank` text,
    primary key (id)
);

drop table if exists `products`;
create table `products` (
    `id` int not null auto_increment,
    `name` text,
    `model_number` text,
    `price` int,
    `maker_id` int,
    primary key (id)
);

drop table if exists `makers`;
create table `makers` (
    `id` int not null auto_increment,
    `name` text,    
    primary key (id)
);

drop table if exists `orders`;
create table `orders` (
    `id` int not null auto_increment,
    `order_date` int,
    `user_id` int,
    primary key (id)
);

drop table if exists `order_product`;
create table `order_product` (
    `id` int not null auto_increment,
    `product_id` int,
    `order_id` int,
    primary key (id)
);
