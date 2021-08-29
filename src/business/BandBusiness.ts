import { BandDatabaseBase } from "../data/BandDatabase";
import { InvalidInfoError } from "../error/InvalidInfoError";
import { UnauthorizedError } from "../error/UnauthorizedError";
import { Band, BandInputDTO } from "../model/Band";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandBusiness {
    constructor(
        private bandDatabase: BandDatabaseBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    public async signupBand(input: BandInputDTO, token: string | undefined) {
        const tokenData = this.authenticator.getData(token!)
        const id = this.idGenerator.generate()

        if (tokenData.role !== UserRole.ADMIN) {
            throw new UnauthorizedError("Bands can only be registered by ADMINs")
        }

        if (!input.name || !input.genre || !input.responsible) {
            throw new InvalidInfoError("Invalid information provided")
        }

        await this.bandDatabase.signupBand(
            Band.toBandModel({
                ...input,
                id,       
            })!
        )
    }

    public async getDetails(input: string) {
        if(!input) {
            throw new InvalidInfoError("Invalid id or name")
        }

        return await this.bandDatabase.getDetails(input)
    }
}