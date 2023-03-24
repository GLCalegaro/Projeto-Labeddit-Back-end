import {PostBusiness} from '../../src/business/PostBusiness'
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { PostDatabaseMock } from '../mocks/PostDatabaseMock'
import { UserDatabaseMock } from '../mocks/UserDatabaseMock'
import { BadRequestError } from '../../src/errors/BadRequestError'

describe("/:id",()=>{

    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )

    test("Retorna erro se o usurário já interagiu com a publicação", ()=>{
        const input = {id:'p001', like:1, token: 'token-mock-normal'}

        expect(async()=>{
            await postBusiness.likeDislike(input)
        }).rejects.toThrow("Você já curtiu esta publicação!")
    })

    test("Testa erro de formato do 'token'", ()=>{
        const input = {id:'p001', like:1, token:136516}
        
        expect(async()=>{
            await postBusiness.likeDislike(input)
        }).rejects.toThrow("'Token' não informado!")
    })

    test ("Testa erro de 'token' inválido",async () => {
        expect.assertions(2);

        const input = {
            id:"p001",
            token: "new-token",
            like: 0
        }

        try{
            await postBusiness.likeDislike(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'Token' inválido!")
                expect(error.statusCode).toBe(400)
            }
        }
    })

})