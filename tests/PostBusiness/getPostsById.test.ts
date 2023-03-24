import { HashManagerMock } from "../mocks/HashManagerMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import {PostBusiness} from '../../src/business/PostBusiness'
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { GetAllPostsInputDTO, GetPostsInputDTO } from "../../src/dtos/PostDTO";
import { USER_ROLES } from "../../src/types";
import { UserDatabase } from "../../src/database/UserDatabase";
import { BadRequestError } from "../../src/errors/BadRequestError";

describe("/:id", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )

//Teste com toThrow (sem try / catch)
        test ("Testar input de token inexistente",async () => {
            const input: GetPostsInputDTO = {
                id: "id-mock-normal",
                token: "",
            }

            expect(async ()=>{
                await postBusiness.getPostById(input)
            }).rejects.toThrow("'Token' inválido!")
    })

    test ("Testa erro de formato de 'token'",async () => {
        expect.assertions(2);

        const input = {
            id:'p001', 
            token: 12547
        }

        try{
            await postBusiness.getPostById(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'Token' não informado!")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test("Retorna um erro com id de Post incorreto", ()=>{
        const input = {id: 'idp00', token: 'token-mock-normal'}
        
        expect(async()=>{
            await postBusiness.getPostById(input)
        }).rejects.toThrow("'Post' não encontrado")
    })

})