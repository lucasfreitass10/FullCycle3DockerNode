use nodedb;

CREATE TABLE IF NOT EXISTS people (
    id INT auto_increment,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);