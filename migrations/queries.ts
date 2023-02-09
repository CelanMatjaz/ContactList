export const dropDatabase = `
DROP DATABASE IF EXISTS naloga`;

export const createDatabaseQuery = `
CREATE DATABASE naloga WITH
ENCODING = 'UTF8'
TABLESPACE = pg_default
CONNECTION LIMIT = -1;`;

export const createUsersTableQuery = `
CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(64) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);`;

export const createContactsTableQuery = `
CREATE TABLE contacts (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    number VARCHAR(32) NOT NULL,
    created_at TIMESTAMP NULL DEFAULT NOW(),
	updated_at TIMESTAMP NULL DEFAULT NOW()
);`;
