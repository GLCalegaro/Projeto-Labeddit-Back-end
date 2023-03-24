<h1 align="center">Projeto Labeddit (Back-end)</h1>

## 🗒️ Sobre
O Objetivo deste projeto Web Full Stack proposto no Bootcamp Labenu, é funcionar como uma rede social e está dividido em 2 repositórios (Labeddit-Back-End e Labeddit-Front-End). Dentro do aplicativo, você poderá criar seu cadastro e interagir com as publicações (curtir, comentar, editar) de outros usuários.

A API foi construida com o objetivo de gerenciar as informações da Base de Dados da aplicação do Labeddit, onde você pode manipular informações de cadastro de usuários e suas publicações.

* 💻 Acesse aqui o deploy: [Render](https://projeto-labeddit-back-end-dgds.onrender.com).

* 🔗 Link Repositório [Front-end](https://github.com/GLCalegaro/Projeto-Labeddit-Front-end).

* 🔗 Link API [Postman]().

## Descrição do projeto:
Para a API foram modeladas 5 entidades: USERS(usuários), POSTS(publicação), COMMENTS(comentários), LIKES_DISLIKES_POSTS(likes e dislikes publicações), LIKES_DISLIKES_COMMENTS(likes e dislikes comentários).

* users: id, username, email, password, role, created_at;
* posts: id, creator_id, content, comments, likes, dislikes, created_at, updated_at;
* comments: id, creator_id, content, post_id, comments, likes, dislikes, created_at, updated_at;
* likes_dislikes_posts: post_id, user_id, likes;
* likes_dislikes_comments: comments_id, user_id, likes;

<p>
<img src="https://user-images.githubusercontent.com/111308068/227624820-cbba2992-88c6-433d-b3d1-9fbf4ed1c374.png" /></p>

### Endpoints
* Get Users: Retorna todos os usuários cadastrados;
* Post Signup: Cadastro de novo usuário;
* Post Login: Fornecer Login e Senha para acesso a aplicação;
* Get Posts: Retorna todos as publicações cadastradas;
* Post 'Post': Cadastra uma nova publicação;
* Post Comment: Cadastra um novo comentário;
* Put Edit Post: Edita uma publicação a partir de seu "ID";
* Delete Post: Remove uma publicação existente a partir de seu "ID";
* Put Like or Dislike: Envia um 'like' (like=1) ou 'dislike' (like=0) em uma publicação ou comentário.

### Testes
No total, a cobertura de testes do back-end foi de 72,98%;
<p>
<img src="https://user-images.githubusercontent.com/111308068/227626456-60c8e895-ef41-4456-a31c-e999a2ce67c3.png" /></p>

## 📚 Bibliotecas e ferramentas utilizadas:

- cors: biblioteca para liberar acesso externo ao servido;
- express : framework para criar o servidor (API);
- knex: biblioteca query builder para conectar com banco de dados;
- sqlite3: biblioteca do banco de dados SQLite;
- uuid: biblioteca para geração de Identificador Único Universal;
- dotenv: biblioteca de variáveis de ambiente;
- jsonwebtoken: biblioteca para geração de tokens;
- bcryptjs: biblioteca para criptografia de senhas;

## Programas utilizados:
* VSCode
* Postman API Platform

## 🛠️ Tecnologias:

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain.svg" width="40" height="40"/> <img 
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg"  width="40" height="40" /> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg" width="40" height="40"/> <img
src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" width="40" height="40" />

## 📝 Instruções de instalação do projeto:
- npm install: Instala todas as dependências listadas no package.json;
- npm run dev: Estabelece a conexão com o banco de dados e reinicia automaticamente o servidor localhost (padrao 3003) toda a vez que o projeto for salvo ou alterado.
