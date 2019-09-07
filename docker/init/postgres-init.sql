CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	name VARCHAR NOT NULL,
	pwd VARCHAR NOT NULL,
	role VARCHAR NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS item (
	id uuid NOT NULL DEFAULT uuid_generate_v4(),
	name VARCHAR NOT NULL,
	price INTEGER NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO users ("name", "pwd", "role") VALUES ('tingkai', 'htkkoeoh', 'ADMIN');
