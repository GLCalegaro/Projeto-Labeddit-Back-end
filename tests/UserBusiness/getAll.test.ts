import { UserBusiness } from "../../src/business/UserBusiness"
import { USER_ROLES } from "../../src/types"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("login", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve retornar uma lista de Users", async () => {
        const response = await userBusiness.getAll()
        expect(response).toHaveLength(2)
        expect(response).toContainEqual({
            id: "id-mock",
            username: "Normal Mock",
            email: "normal@email.com",
            password: "hash-bananinha",
            createdAt: expect.any(String), // valor dinâmico (pode ser qualquer string)
            role: USER_ROLES.NORMAL
        })
    })

    test("Retorna erro caso o post seja undefined", ()=>{
        const input = {idToFind: 12+'undefined', token: 'token-mock-normal'}
        
        expect(async()=>{
            await userBusiness.getById(input)
        }).rejects.toThrow("'id' não existe")
    })
})