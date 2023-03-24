import {PostBusiness} from '../../src/business/PostBusiness'
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostDatabaseMock } from '../mocks/PostDatabaseMock'
import { UserDatabaseMock } from '../mocks/UserDatabaseMock'
import { UpdateInputDTO } from '../../src/dtos/PostDTO'
import { BadRequestError } from '../../src/errors/BadRequestError'

describe("/:id",()=>{

    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )

    test("Retorna erro caso o post seja inexistente", ()=>{
        const input:UpdateInputDTO = {id:'idp001', content: 'attcontent', token: 'token-mock-normal'}

        expect(async()=>{
            await postBusiness.updatePost(input)
        }).rejects.toThrow("'Id' não localizada")
    })

    test("Testa erro de formato de 'token'", ()=>{
        const input:UpdateInputDTO = {id:'p001', content: 'attcontent', token: false}

        expect(async()=>{
            await postBusiness.updatePost(input)
        }).rejects.toThrow("'Token' não informado!")
    })

    test("Retorna erro de formato de 'token' inexistente", ()=>{
        const input = {id: 'p001', content: "teste", token: "ok"}
        
        expect(async()=>{
            await postBusiness.updatePost(input)
        }).rejects.toThrow("'Token' inválido!")
    })

    // test("Testa regra de 'role' e 'token' para edição de posts", ()=>{
    //     const input = {
    //         id: "p001", 
    //         content: "teste", 
    //         token: "token-mock-normal"
    //     }
        
    //     expect(async()=>{
    //         await postBusiness.updatePost(input)
    //     }).rejects.toThrow("Você não possui autorização para editar esta publicação.")
    // })

    test ("Testa erro de formato de 'content'",async () => {
        expect.assertions(2);

        const input = {id: "p001", token: 'token-mock-normal', content: true}

        try{
            await postBusiness.updatePost(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'content' precisa ser uma string")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test ("Testa erro de 'content' inexistente",async () => {
        expect.assertions(2);

        const input = {id: "p001", token: 'token-mock-normal', content: undefined}

        try{
            await postBusiness.updatePost(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("Favor, informar o 'content'")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("Teste atualização de post", async()=>{
        const input:UpdateInputDTO = {
            id: "p001", 
        token: 'token-mock-normal', 
        content:'content'
    }
        
        const response = await postBusiness.updatePost(input)

        expect(response).toBeTruthy()
        
    })
})