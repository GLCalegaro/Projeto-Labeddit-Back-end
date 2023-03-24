import { PostDB, CommentDB, LikeDislikePostDB, LikeDislikeCommentDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase{
    public static POSTS_TABLE = "posts"
    public static COMMENTS_TABLE = "comments"
    public static LIKEDISLIKE_TABLE = "likes_dislikes_posts"
    public static LIKEDISLIKECOMMENT_TABLE = "likes_dislikes_comments"
    public static USERS_TABLE = "users"

    public getAllPosts = async () => {
        const postDB = await BaseDatabase
        .connection(PostDatabase.POSTS_TABLE)
        .select()

        return postDB
    }

    public getPostsWithCreator = async()=>{
        const postsDB = await this.getAllPosts()
        const creatorsDB = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()

        return{
            postsDB,
            creatorsDB,
        }
    }

    public getPostWithComments = async(id:string)=>{
        const postsDB = await BaseDatabase
        .connection(PostDatabase.POSTS_TABLE)
        .select().where({id:id})

        const creatorsDB = await BaseDatabase
        .connection(UserDatabase.TABLE_USERS)
        .select()

        const commentsDB = await BaseDatabase
        .connection(PostDatabase.COMMENTS_TABLE)
        .select("comments.*","users.username")
        .leftJoin(PostDatabase.USERS_TABLE,"users.id","=","comments.creator_id")

        return{
            postsDB,
            creatorsDB,
            commentsDB,
        }
    }

    public getPostById = async (id: string):Promise<PostDB | undefined>=>{
        const [postDB]:PostDB[] = await BaseDatabase
        .connection(PostDatabase.POSTS_TABLE)
        .select().where({id: id})

        return postDB
    }

    // Busca um unico comentário
    public getCommentById = async (id: string):Promise<CommentDB | undefined>=>{
        const [commentDB]:CommentDB[] | undefined = await BaseDatabase
        .connection(PostDatabase.COMMENTS_TABLE)
        .select().where({id:id})

        return commentDB
    }

    // Busca uma relação de comentários pelo post_id
    public getCommentsById = async(id:string):Promise<PostDB[] | undefined>=>{
        const commentDB:PostDB[] | undefined = await BaseDatabase
        .connection(PostDatabase.COMMENTS_TABLE)
        .select().where({post_id:id})

        return commentDB
    }

    public getLikeDislikeByPostId = async (id:string):Promise<LikeDislikePostDB[] | undefined>=>{
        const likeDislikePostDB:LikeDislikePostDB[] | undefined = await BaseDatabase
        .connection(PostDatabase.LIKEDISLIKE_TABLE)
        .select().where({post_id:id})

        return likeDislikePostDB
    }

    public getLikeDislikeByCommentId = async (id:string):Promise<LikeDislikeCommentDB[] | undefined>=>{
        const likeDislikeDB:LikeDislikeCommentDB[] | undefined = await BaseDatabase
        .connection(PostDatabase.LIKEDISLIKECOMMENT_TABLE)
        .select().where({comment_id:id})

        return likeDislikeDB
    }

    public insertNewPost = async(newPostDB:PostDB)=>{
        await BaseDatabase.connection(PostDatabase.POSTS_TABLE)
        .insert(newPostDB)
    }

    public insertNewComment = async(newPostDB:CommentDB)=>{
        await BaseDatabase.connection(PostDatabase.COMMENTS_TABLE)
        .insert(newPostDB)
    }

    public updatePost = async(updatePost:PostDB,id:string)=>{
        await BaseDatabase
        .connection(PostDatabase.POSTS_TABLE)
        .update(updatePost)
        .where({id:id})
    }

    public updateComment = async(updatePost:PostDB,id:string)=>{
        await BaseDatabase
        .connection(PostDatabase.COMMENTS_TABLE)
        .update(updatePost)
        .where({id:id})
    }

    public removePostbyId = async(id:string)=>{
        await BaseDatabase
        .connection(PostDatabase.POSTS_TABLE)
        .del()
        .where({id:id})
    }

    public removeCommentsbyId = async(id:string)=>{
        await BaseDatabase
        .connection(PostDatabase.COMMENTS_TABLE)
        .del()
        .where({post_id:id})
    }

    public removeLikeDislike = async(id:string)=>{
        await BaseDatabase
        .connection(PostDatabase.LIKEDISLIKE_TABLE)
        .del()
        .where({post_id:id})
    }

    public removeLikeDislikeComments = async(id:string)=>{
        await BaseDatabase
        .connection(PostDatabase.LIKEDISLIKE_TABLE)
        .del()
        .where({comment_id:id})
    }

    public likeDislike = async(user_id:string, post_id: string):Promise<LikeDislikePostDB | undefined>=>{
         const [likeDislikePostDB]:LikeDislikePostDB[] | undefined = await BaseDatabase
        .connection(PostDatabase.LIKEDISLIKE_TABLE)
        .select().where({user_id:user_id, post_id: post_id})

        return likeDislikePostDB
    }

    public updateLikeDislike = async(updateLD:LikeDislikePostDB)=>{
        await BaseDatabase
        .connection(PostDatabase.LIKEDISLIKE_TABLE)
        .insert(updateLD)
    }

    public updateLikeDislikeComment = async(updateLD:LikeDislikeCommentDB)=>{
        await BaseDatabase
        .connection(PostDatabase.LIKEDISLIKECOMMENT_TABLE)
        .insert(updateLD)
    }
}