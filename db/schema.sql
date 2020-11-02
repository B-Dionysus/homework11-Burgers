create database burgers_db;
use burgers_db;
create table burgers(id int auto_increment not null primary key, burger_name varchar(255), devoured boolean);
update burgers set devoured=false where id<1000;
