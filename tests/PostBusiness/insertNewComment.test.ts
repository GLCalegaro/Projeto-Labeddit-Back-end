import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import {PostBusiness} from '../../src/business/PostBusiness'
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { InsertInputCommentDTO } from "../../src/dtos/PostDTO";

describe("/:id", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )

    test("Retorna erro caso o post seja inexistente", ()=>{
        const input = {id_post: 'idp001', token: 'token-mock-normal', content:'content'}
        
        expect(async()=>{
            await postBusiness.insertNewComment(input)
        }).rejects.toThrow("'Post' não encontrado.")
    })

    test ("Testa erro de formato de 'content'",async () => {
        expect.assertions(2);

        const input = {id_post: "p001", token: 'token-mock-normal', content: 12}

        try{
            await postBusiness.insertNewComment(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'content' precisa ser uma string")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test ("Testa de 'content' inexistente",async () => {
        expect.assertions(2);

        const input = {id_post: "p001", token: 'token-mock-normal', content: undefined}

        try{
            await postBusiness.insertNewComment(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("Favor, informar o 'content'")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test ("Testa erro de formato de 'token'",async () => {
        expect.assertions(2);

        const input = {
            id_post:'p001', 
            token: true,
            content: "test"
        }

        try{
            await postBusiness.insertNewComment(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'Token' não informado!")
                expect(error.statusCode).toBe(400)
            }
        }
    })


    test("Retorna erro de formato de 'token' inexistente", ()=>{
        const input = {id_post: 'p001', content: "teste", token: 'token-mock'}
        
        expect(async()=>{
            await postBusiness.insertNewComment(input)
        }).rejects.toThrow("'Token' inválido!")
    })

    test("Testa a criação de um comentário", async()=>{
        const input:InsertInputCommentDTO = {
            id_post: 'p001',
            token: 'token-mock-normal', 
            content:'content'
        }
        
        const response = await postBusiness.insertNewComment(input)

        expect(response).toBeTruthy()    
    })

})
