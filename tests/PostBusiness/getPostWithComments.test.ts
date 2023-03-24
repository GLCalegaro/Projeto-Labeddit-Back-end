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

    test("Retorna todos os posts com comentários", async()=>{
        const input = {id: 'p001', token: 'token-mock-normal'}
        const output= [{
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
                },
                comments_post:[{
                    id: 'c001',
                    creator_id: 'id-mock-1',
                    content: 'Comentário 1',
                    post_id: 'p001',
                    likes: 0,
                    dislikes: 0,
                    created_at: "2023-03-13T18:39:22.047Z",
                    updated_at: "2023-03-13T18:39:22.047Z"
                  },
                  {
                    id: 'c003',
                    creator_id: 'id-mock-2',
                    content: 'Comentário 2',
                    post_id: 'p001',
                    likes: 0,
                    dislikes: 0,
                    created_at: "2023-03-13T18:39:22.047Z",
                    updated_at: "2023-03-13T18:39:22.047Z"
                  }]                
            },
            {
                id: 'id-mock',
                content: 'post2',
                comments: 1,
                likes: 0,
                dislikes: 0,
                created_at: expect.any(String),
                updated_at: expect.any(String),
                creator: { id: 'id-mock', username: 'Normal Mock' },
                comments_post:[]
            }
        ]

        const response = await postBusiness.getPostById(input)
 
        expect(response).toEqual(output)
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


    test("Retorna erro de formato de 'token' inexistente", ()=>{
        const input = {id: 'p001', token: 'token-mock'}
        
        expect(async()=>{
            await postBusiness.getPostById(input)
        }).rejects.toThrow("'Token' inválido!")
    })

})