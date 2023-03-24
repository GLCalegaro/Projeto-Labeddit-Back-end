import express from "express";
import { PostBusiness } from "../business/PostBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { PostDTO } from "../dtos/postDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const postRouter = express.Router()

const postController = new PostController(

    new PostBusiness(
        new PostDatabase(),
        new UserDatabase(),
        new IdGenerator(),
        new TokenManager()      
    ),
    new PostDTO())

// Endpoint para buscar todos os posts
postRouter.get("/", postController.getPosts)

// // Endpoint para buscar um post por ID
postRouter.get("/:id", postController.getPostById)

// // Endpoint para inserir novo post
postRouter.post("/", postController.createNewPost)

// // Endpoint para inserir novo comentário
postRouter.post("/:id", postController.insertNewComment)

// // Endpoint para atualizar um post
postRouter.put("/:id", postController.updatePost)

// // Endpoint para remover post
postRouter.delete("/:id", postController.removePost)

// // Endpoint like/dislike posts e comments
postRouter.put("/:id/like", postController.likeDislike)