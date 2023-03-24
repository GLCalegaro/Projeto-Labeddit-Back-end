import { PostDB, CommentDB, LikeDislikePostDB, LikeDislikeCommentDB, USER_ROLES, UserDB } from "../../src/types"
import { BaseDatabase } from "../../src/database/BaseDatabase"

export class PostDatabaseMock extends BaseDatabase{
    public static POSTS_TABLE = "posts"
    public static COMMENTS_TABLE = "comments"
    public static LIKEDISLIKE_TABLE = "likes_dislikes_posts"
    public static LIKEDISLIKECOMMENT_TABLE = "likes_dislikes_comments"
    public static USERS_TABLE = "users"

    public getAllPosts = async ():Promise<PostDB[]> => {
        return[
            {
                id: 'p001',
                creator_id: 'id-mock',
                content: 'post1',
                comments: 0,
                likes: 1,
                dislikes: 1,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            },
            {
                id: 'id-mock',
                creator_id: 'id-mock',
                content: 'post2',
                comments: 1,
                likes: 0,
                dislikes: 0,
                created_at: expect.any(String),
                updated_at: expect.any(String),
            }
        ]
    }

    public getPostById = async (id:string): Promise<PostDB | undefined> => {

        if(id === 'p001'){
            return{
                    id: 'p001',
                    creator_id: 'id-mock',
                    content: 'post1',
                    comments: 0,
                    likes: 1,
                    dislikes: 1,
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                }
            }
        }

    public getPostsWithCreator = async()=>{
        const postsDB = await this.getAllPosts()
        const creatorsDB = [{
            id: "id-mock",
            username: "Normal Mock",
            email: "normal@email.com",
            password: "hash-bananinha",
            created_at: expect.any(String),
            role: USER_ROLES.NORMAL
        },
        {
            id: "id-mock",
            username: "Admin Mock",
            email: "admin@email.com",
            password: "hash-bananinha",
            created_at: expect.any(String),
            role: USER_ROLES.ADMIN
        }]
        
        return{
            postsDB,
            creatorsDB,
        }
    }

    //Busca por comentário a partir do ID
    public getCommentById = async (id: string):Promise<CommentDB | undefined>=>{
        if(id === 'c001'){
            return{
                    id: 'c001',
                    creator_id: 'id-mock',
                    content: 'comment content1',
                    likes: 1,
                    dislikes: 0,
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                    post_id: 'p001',
                }
            }
    }

    public getCommentsById = async(id:string):Promise<PostDB[] | undefined>=>{
        if(id === 'c001'){
            return[{
                    id:'c001',
                    creator_id: 'id-mock',
                    content: 'publicacao1',
                    comments: 0,
                    likes: 1,
                    dislikes: 1,
                    created_at: expect.any(String),
                    updated_at: expect.any(String),
                }]
            }
    }


    public getPostWithComments = async(id:string)=>{
        const postsDB = await this.getAllPosts()
        const creatorsDB = [{
            id: "id-mock",
            username: "Normal Mock",
            email: "normal@email.com",
            password: "hash-bananinha",
            created_at: expect.any(String),
            role: USER_ROLES.NORMAL
        },
        {
            id: "id-mock",
            username: "Admin Mock",
            email: "admin@email.com",
            password: "hash-bananinha",
            created_at: expect.any(String),
            role: USER_ROLES.ADMIN
        }]
        const commentsDB = [{
            id: 'c001',
            creator_id: 'id-mock-1',
            content: 'Comentário 1',
            likes: 0,
            dislikes: 0,
            created_at: "2023-03-13T18:39:22.047Z",
            updated_at: "2023-03-13T18:39:22.047Z",
            post_id: 'p001'
          },
          {
            id: 'c003',
            creator_id: 'id-mock-2',
            content: 'Comentário 2',
            likes: 0,
            dislikes: 0,
            created_at: "2023-03-13T18:39:22.047Z",
            updated_at: "2023-03-13T18:39:22.047Z",
            post_id: 'p001'
          }]
       
        return{
            postsDB,
            creatorsDB,
            commentsDB,
        }
    }

    public getLikeDislikeByPostId = async (id:string):Promise<LikeDislikePostDB[] | undefined>=>{
        return[{
            user_id: 'id-mock',
            post_id: 'p001',
            like: 1,
            }]
    }

    public getLikeDislikeByCommentId = async (id:string):Promise<LikeDislikeCommentDB[] | undefined>=>{
        return[{
            user_id: 'id-mock',
            comment_id: 'c001',
            like: 1,
        }]
    }

    public insertNewPost = async(newPostDB:PostDB):Promise<void>=>{
        // não há retorno pois é void.
    }

    public insertNewComment = async(newPostDB:CommentDB):Promise<void>=>{
        // não há retorno pois é void.
    }

    public updatePost = async(updatePost:PostDB,id:string):Promise<void>=>{
        // não há retorno pois é void.
    }

    public updateComment = async(updatePost:PostDB,id:string):Promise<void>=>{
        // não há retorno pois é void.
    }

    public removePostbyId = async(id:string):Promise<void>=>{
        // não há retorno pois é void.
    }

    public removeCommentsbyId = async(id:string):Promise<void>=>{
        // não há retorno pois é void.
    }

    public removeLikeDislike = async(id:string):Promise<void>=>{
        // não há retorno pois é void.
    }

    public removeLikeDislikeComments = async(id:string):Promise<void>=>{
        // não há retorno pois é void.
    }

    public likeDislike = async(user_id:string, post_id: string):Promise<LikeDislikePostDB | undefined>=>{
        return{
            user_id: 'id-mock',
            post_id: 'p001',
            like: 1,
        }
    }

    public updateLikeDislike = async(updateLD:LikeDislikePostDB):Promise<void>=>{
        //não há retorno pois é void.
    }

    public updateLikeDislikeComment = async(updateLD:LikeDislikeCommentDB):Promise<void>=>{
        //não há retorno pois é void.
    }
}