
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Ideally you would want a message table for each user and then each conversation
-- to save time I've just made one huge table, since we won't have that many messages 

CREATE TABLE users (
  id uuid primary key default gen_random_uuid(),
  hash varchar(100) NOT NULL,
  email text UNIQUE NOT NULL
);

CREATE TABLE messages (
  tracking bigserial UNIQUE primary key,
  user_id varchar(50) NOT NULL,
  from_phone CHAR(11) NOT NULL,
  CONSTRAINT chk_from CHECK (from_phone not like '%[^0-9]%'),
  to_phone CHAR(11) NOT NULL,
  CONSTRAINT chk_to CHECK (to_phone not like '%[^0-9]%'),
  nickname varchar(100),
  convo_id CHAR(11) NOT NULL,
  message varchar(250) NOT NULL
);