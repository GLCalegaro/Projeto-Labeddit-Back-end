import {PostBusiness} from '../../src/business/PostBusiness'
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostDatabaseMock } from '../mocks/PostDatabaseMock'
import { UserDatabaseMock } from '../mocks/UserDatabaseMock'
import { InsertInputPostDTO } from '../../src/dtos/PostDTO'
import { BadRequestError } from '../../src/errors/BadRequestError'

describe("Método insert",()=>{

    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )

    test("Teste criação de post", async()=>{
        const input:InsertInputPostDTO = {token: 'token-mock-normal', content:'content'}
        
        const response = await postBusiness.createNewPost(input)

        expect(response).toBeTruthy()
        
    })

    test("Retorna erro com 'token' inválido", ()=>{
        const input = {token: 'token-mock', content:'content'}
        
        expect(async()=>{
            await postBusiness.createNewPost(input)
        }).rejects.toThrow("'Token' inválido!")
    })

    test("Testar mensagem de inserção de novo post", async () => {
        const input = {token: "token-mock-normal", content:'content'}
  
        const response = await postBusiness.createNewPost(input)
        expect(response.message).toBe("Post publicado com sucesso!")
        // expect(response).toEqual({ message: "Post publicado com sucesso!" })
      })

      test ("Testa erro de formato de 'token'",async () => {
        expect.assertions(2);

        const input = {
            id:'p001', 
            token: 12547,
            content: "teste"
        }

        try{
            await postBusiness.createNewPost(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'Token' não informado!")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test ("Testa erro de formato de 'content'",async () => {
        expect.assertions(2);

        const input = {token: 'token-mock-normal', content: 451}

        try{
            await postBusiness.createNewPost(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'content' precisa ser uma string")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test ("Testa de 'content' inexistente",async () => {
        expect.assertions(2);

        const input = {token: 'token-mock-normal', content: undefined}

        try{
            await postBusiness.createNewPost(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("Favor, informar o 'content'")
                expect(error.statusCode).toBe(400)
            }
        }
    })

})