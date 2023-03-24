export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TokenPayload {
    id: string,
	username: string,
    role: USER_ROLES
}

export interface UserDB {
    id: string,
    username: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserModel {
    id: string,
    username: string,
    email: string,
    password: string,
    role: USER_ROLES,
    createdAt: string
}

export interface PostDB{
    id: string,
    creator_id: string,
    content: string,
    comments: number,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
}

//Interface para dados de comentário de publicação
export interface CommentDB{
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    post_id: string,
}

//Interface para dados de comentário de publicação
export interface CommentWithCreatorDB{
    id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    post_id: string,
    creator:{
        creator_id: string,
        username: string,
    }
}

//Interface para dados de publicação, relacionando usuário que a criou
export interface PostbyUsersDB{
    id: string,
    content: string,
    comments: number,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: {
        id: string,
        username: string,
    }
}

//Interface para dados de publicação individual e seus comentários
export interface PostWithCommentsDB{
    id: string,
    content: string,
    comments: number,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: {
        id: string,
        username: string,
    },
    comments_post: CommentWithCreatorDB,
}

//Interface para dados da tabela de like-dislikes de publicação
export interface LikeDislikePostDB{
    post_id: string,
    user_id: string,
    like: number,
}

//Interface para dados da tabela de like-dislikes de comentários
export interface LikeDislikeCommentDB{
    comment_id: string,
    user_id: string,
    like: number,
}
