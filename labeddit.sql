<<<<<<< HEAD
-- Active: 1678391261901@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()));

INSERT INTO users (id, username, email, password, role)
VALUES
	("u001", "Giovanna", "giovanna@emaillabeddit.com", "$2a$12$Tx", "ADMIN"),
	
    ("u002", "Otavio", "otavio@emaillabeddit.com", "$5j$12$C9", "NORMAL");

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    creator_id TEXT NOT NULL, 
    content TEXT, 
    comments INTEGER DEFAULT(0) NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL, 
    dislikes INTEGER DEFAULT(0) NOT NULL, 
    created_at TEXT DEFAULT(DATETIME()) NOT NULL, 
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id));

INSERT INTO posts (id, creator_id, content)
VALUES 
("p001", "u001", "Beach please! - em Ilha do Mel(PR)."),
("p002", "u002", "Projeto full-stack conexão samsung finalizado!");


CREATE TABLE comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    creator_id TEXT NOT NULL, 
    content TEXT,
    post_id TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL, 
    dislikes INTEGER DEFAULT(0) NOT NULL, 
    created_at TEXT DEFAULT(DATETIME()) NOT NULL, 
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

INSERT INTO comments(id, creator_id, content, post_id)
VALUES
("c001", "u002", "Foram para a praia do farol? :O", "p001"),
("c002", "u001", "Parabéns queridinho.", "p002"),
("c003", "u002", "Amo vc!<3", "p001");

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM comments;

CREATE TABLE likes_dislikes_posts( 
    post_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    like INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id));

INSERT INTO likes_dislike_posts( post_id, user_id, like )
VALUES ( "PO04", "US04", 2),
        ( "PO02", "US01", 2),
        ( "PO01", "US06", 4);

CREATE TABLE likes_dislikes_comments(
    comment_id TEXT NOT NULL,
    user_id TEXT NOT NULL,  
    like INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
=======
-- Active: 1678391261901@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()));

INSERT INTO users (id, username, email, password, role)
VALUES
	("u001", "Giovanna", "giovanna@emaillabeddit.com", "$2a$12$Tx", "ADMIN"),
	
    ("u002", "Otavio", "otavio@emaillabeddit.com", "$5j$12$C9", "NORMAL");

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    creator_id TEXT NOT NULL, 
    content TEXT, 
    comments INTEGER DEFAULT(0) NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL, 
    dislikes INTEGER DEFAULT(0) NOT NULL, 
    created_at TEXT DEFAULT(DATETIME()) NOT NULL, 
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id));

INSERT INTO posts (id, creator_id, content)
VALUES 
("p001", "u001", "Beach please! - em Ilha do Mel(PR)."),
("p002", "u002", "Projeto full-stack conexão samsung finalizado!");


CREATE TABLE comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    creator_id TEXT NOT NULL, 
    content TEXT,
    post_id TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL, 
    dislikes INTEGER DEFAULT(0) NOT NULL, 
    created_at TEXT DEFAULT(DATETIME()) NOT NULL, 
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id),
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

INSERT INTO comments(id, creator_id, content, post_id)
VALUES
("c001", "u002", "Foram para a praia do farol? :O", "p001"),
("c002", "u001", "Parabéns queridinho.", "p002"),
("c003", "u002", "Amo vc!<3", "p001");

SELECT * FROM users;
SELECT * FROM posts;
SELECT * FROM comments;

CREATE TABLE likes_dislikes_posts( 
    post_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    like INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(post_id) REFERENCES posts(id));

INSERT INTO likes_dislike_posts( post_id, user_id, like )
VALUES ( "PO04", "US04", 2),
        ( "PO02", "US01", 2),
        ( "PO01", "US06", 4);

CREATE TABLE likes_dislikes_comments(
    comment_id TEXT NOT NULL,
    user_id TEXT NOT NULL,  
    like INTEGER,
    FOREIGN KEY(user_id) REFERENCES users(id),
>>>>>>> 240241ba1c71f2858cb93486203553729a70297b
    FOREIGN KEY (comment_id) REFERENCES comments_posts(id));