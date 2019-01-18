BEGIN;

DROP TABLE IF EXISTS users, posts, replies CASCADE;

CREATE TABLE users (
  id            serial        PRIMARY KEY,
  username      varchar(100)  NOT NULL
);

CREATE TABLE posts (
  id            serial        PRIMARY KEY,
  author_id     integer       REFERENCES users(id) ON UPDATE CASCADE,
  post_date     timestamp with time zone NOT NULL,
  text_content  text
);

CREATE TABLE replies (
  id            serial        PRIMARY KEY,
  author_id     integer       REFERENCES users(id) ON UPDATE CASCADE,
  post_id       integer       REFERENCES posts(id) ON UPDATE CASCADE,
  reply_date     timestamp with time zone NOT NULL,
  text_content  text
);

INSERT INTO users(username) VALUES
  ('arty'),
  ('ksenia'),
  ('julia')
RETURNING ID;

INSERT INTO posts(author_id, post_date, text_content)  VALUES
  (1, '2019-01-12 08:27:06', 'This is a test post, post date set to today..'),
  (1, '2018-12-12 05:31:11', 'This is another test post set to last month..'),
  (3, '2019-01-12 06:27:06', 'A test post from another user')
RETURNING ID;

INSERT INTO replies(author_id, post_id, reply_date, text_content)    VALUES
  (3, 1, '2019-01-12 08:28:20', 'Test reply'),
  (1, 3, '2019-01-12 08:28:20', 'Another test reply')
RETURNING ID;

COMMIT;
