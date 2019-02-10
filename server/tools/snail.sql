create table books(
    id INT not null auto_increment primary key,
    isbn VARCHAR(20) not null,
    openId VARCHAR(50) not null,
    title VARCHAR(100) not null,
    image VARCHAR(100),
    alt VARCHAR(100) not null,
    publisher VARCHAR(100) not null,
    price VARCHAR(100),
    rate FLOAT,
    tags VARCHAR(100),
    author VARCHAR(100) not null,
    summary VARCHAR(255) not null
)

create table comments(
    id INT not null auto_increment primary key,
    bookid INT(255) not null,
    openid VARCHAR(100) not null,
    comment VARCHAR(200) not null,
    phone VARCHAR(20) not null,
    location VARCHAR(50) not null
)