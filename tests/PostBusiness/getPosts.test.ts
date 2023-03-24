import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { UserDatabaseMock } from "../mocks/UserDatabaseMock";
import {PostBusiness} from '../../src/business/PostBusiness'
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { GetAllPostsInputDTO, GetPostsInputDTO } from "../../src/dtos/PostDTO";
import { BadRequestError } from "../../src/errors/BadRequestError";

describe("/:id", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    )

    test("Testar retorno de lista c/ todos os posts e por ID", async()=>{
        const input = {q:'', token: 'token-mock-normal'}
        const output=         {
                id: 'p001',
                content: 'post1',
                comments: 0,
                likes: 1,
                dislikes: 1,
                created_at: expect.any(String),
                updated_at: expect.any(String),
                creator: {
                    id: 'id-mock',
                    username: 'Normal Mock'
                }
            }

        const response = await postBusiness.getPosts(input)

        expect(response).toHaveLength(2)  
        expect(response).toContainEqual(output)

    })
    
//Teste com toThrow (sem try / catch)
        test ("Testar input de token inexistente",async () => {
            const input: GetAllPostsInputDTO = {
                q: "teste",
                token: "",
            }

            expect(async ()=>{
                await postBusiness.getPosts(input)
            }).rejects.toThrow("'Token' inválido!")
    })

    test ("Testa erro de formato de 'token'",async () => {
        expect.assertions(2);

        const input = {
            q:'teste', 
            token: 12547
        }

        try{
            await postBusiness.getPosts(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'Token' não informado!")
                expect(error.statusCode).toBe(400)
            }
        }
    })

})