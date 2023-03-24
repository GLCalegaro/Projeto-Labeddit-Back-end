import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import {PostBusiness} from '../../src/business/PostBusiness'
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { RemoveInputPostDTO } from "../../src/dtos/PostDTO";

describe("/:id", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )

    test("Retorna erro caso o post seja inexistente", ()=>{
        const input = {
            id:'id001', //Não exlcuir usuários com perfil admin
            token: 'token-mock-admin' //Não peritir exlcusão de posts com perfil normal
        } 

        expect(async()=>{
            await postBusiness.removePost(input)
        }).rejects.toThrow("Publicação não encontrada")
    })

    test ("Testa erro de formato de 'token'",async () => {
        expect.assertions(2);

        const input = {
            id:"p001", //Não exlcuir usuários com perfil admin
            token: true
        }

        try{
            await postBusiness.removePost(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'Token' não informado!")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test ("Testa erro de 'token' inválido",async () => {
        expect.assertions(2);

        const input = {
            id:"p001",
            token: "new-token"
        }

        try{
            await postBusiness.removePost(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'Token' inválido!")
                expect(error.statusCode).toBe(400)
            }
        }
    })

})

