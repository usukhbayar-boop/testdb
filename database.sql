CREATE DATABASE bmall;

CREATE TABLE post(
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    content VARCHAR(800),
    date TIMESTAMP
);