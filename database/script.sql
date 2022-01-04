CREATE DATABASE IF NOT EXISTS apostinha;
USE apostinha;


CREATE TABLE IF NOT EXISTS user (
    ID INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(130),
    username VARCHAR(30),
    password VARCHAR(130),
    saldo INT,
    PRIMARY KEY (ID)

);


CREATE TABLE IF NOT EXISTS frag_user (
    idfrag INT AUTO_INCREMENT PRIMARY KEY,
    iduser INT,
    20qnt INT,
    50qnt INT,
    100qnt INT,
    500qnt INT,
    20wins INT,
    50wins INT,
    100wins INT,
    500wins INT,
    FOREIGN KEY (iduser) REFERENCES user(ID)
);

CREATE TABLE IF NOT EXISTS pix_user (
    idpix INT AUTO_INCREMENT PRIMARY KEY,
    iduser INT,
    key_pix VARCHAR(130),
    FOREIGN KEY (iduser) REFERENCES user(ID)

);

CREATE TABLE IF NOT EXISTS 20_players (
    id20p INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    iduser INT,
    data_sorteio VARCHAR(12),
    FOREIGN KEY (iduser) REFERENCES user(ID)
);

CREATE TABLE IF NOT EXISTS 50_players (
    id50p INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    iduser INT,
    data_sorteio VARCHAR(12),
    FOREIGN KEY (iduser) REFERENCES user(ID)
);

CREATE TABLE IF NOT EXISTS 100_players (
    id100p INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    iduser INT,
    data_sorteio VARCHAR(12),
    FOREIGN KEY (iduser) REFERENCES user(ID)
);

CREATE TABLE IF NOT EXISTS 500_players (
    id500p INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    iduser INT,
    data_sorteio VARCHAR(12),
    FOREIGN KEY (iduser) REFERENCES user(ID)
);
