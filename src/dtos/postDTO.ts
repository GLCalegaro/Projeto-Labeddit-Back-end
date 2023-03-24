export interface GetAllPostsInputDTO{
    q: string,
    token: unknown,
}

export interface GetPostsInputDTO{
    id: string,
    token: unknown,
}
    
    export interface InsertInputPostDTO{
        content: unknown,
        token: unknown,
    }

    export interface InsertInputCommentDTO{
        id_post: string,
        content: unknown,
        token: unknown,
    }

    export interface UpdateInputDTO{
        id: string,
        content: unknown,
        token: unknown,
    }

    export interface RemoveInputPostDTO{
        id: string,
        token: unknown,
    }

    export interface LikeDislikeDTO{
        id: string,
        like: unknown,
        token: unknown,
    }

   export class PostDTO {

    getAllPostsInput = (q:string, token:string):GetAllPostsInputDTO=>{
        const result:GetAllPostsInputDTO={
            q,
            token,
        }
        return result
    }

    getPostInput = (id:string, token:string):GetPostsInputDTO=>{
        const result:GetPostsInputDTO={
            id,
            token
        }
        return result
    }

    insertInputPost = (content: string, token: string) :InsertInputPostDTO =>{

        const result: InsertInputPostDTO={
            content,
            token,
        }

        return result
    }

    InsertInputComment = (id_post:string, content: string, token: string) :InsertInputCommentDTO =>{

        const result: InsertInputCommentDTO={
            id_post,
            content,
            token,
        }

        return result
    }

    removeInputPost = (id: string, token: string) :RemoveInputPostDTO =>{

        const result: RemoveInputPostDTO={
            id,
            token,
        }

        return result
    }

    updateInputPost = (id:string, content: string, token: string): UpdateInputDTO =>{

        const result:UpdateInputDTO={
            id,
            content,
            token,
        }

        return result
    }

    likeDislike = (id:string,like:number, token: string):LikeDislikeDTO=>{
        const result:LikeDislikeDTO={
            id,
            like,
            token,
        }

        return result
    }
    
   } 