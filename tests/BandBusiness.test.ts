import { BandBusiness } from "../src/business/BandBusiness"
import { BandInputDTO } from "../src/model/Band"
import  BandDatabaseMock  from "./mocks/BandDatabaseMock"
import IdGeneratorMock from "./mocks/IdGeneratorMock"
import TokenGeneratorMock from "./mocks/TokenGeneratorMock"

const bandBusinessMock = new BandBusiness(
   BandDatabaseMock,
   IdGeneratorMock,
   TokenGeneratorMock
)

describe("Test registering bands", () => {
    test("Must return an error when 'name' is invalid", async ()=> {
        expect.assertions(2)
        try {
            const input: BandInputDTO = {
                name: "Led Zeppelin",
                genre: "Rock",
                responsible: "Roberto das Plantas"
            }

            await bandBusinessMock.signupBand(input, undefined)
        } catch (error) {
            expect(error.message).toEqual("Invalid information provided")
            expect(error.statusCode).toBe(400)
        }
    })

    test("Success must return a message", async () => {
        try {
            const input: BandInputDTO = {
                name: "LED Zé Pelinho",
                genre: "Rock",
                responsible: "Roberto das Plantas"
            }

            await bandBusinessMock.signupBand(input, undefined)

            expect(input).toBe("Band registered!")
        } catch (error) {

        }
    })
})