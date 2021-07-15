CREATE database airbnb;
use airbnb;
create table user(
id int not null auto_increment primary key,
email varchar(50) not null,
password varchar(150) not null,
firstname varchar(45) not null,
lastname varchar(45) not null,
role tinyint(1) default 0

);

create table city (
id int not null auto_increment primary key,
name varchar(45) not null
);

create table place(
id int not null auto_increment primary key,
name varchar(45) not null,
description text not null,
rooms int not null,
bathrooms int not null,
max_guests int not null,
price_by_night float not null,
available tinyint(1) default 0,
user_id int not null,
city_id int not null,
foreign key (user_id) references user(id),
foreign key (city_id) references city(id)
);


create table booking(
id int not null auto_increment primary key,
check_in datetime not null,
check_out datetime  not null,
user_id int not null,
place_id int not null,
foreign key (user_id) references user(id),
foreign key (place_id) references place(id)
);