import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export interface BandDatabaseBase {
    signupBand(band: Band): Promise<void>;
    getDetails(input: string): Promise<Band | undefined >;
}

export class BandDatabase extends BaseDatabase{

    private static TABLE_NAME = "lama_bands"

    public async signupBand(band: Band){
        try {
            await this.getConnection()
            .insert({
                id: band.getId(),
                name: band.getName(),
                music_genre: band.getGenre(),
                responsible: band.getResponsible()
            })
            .into(BandDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    }

    public async getDetails(input: string): Promise<Band> {
        const band = await this.getConnection()
        .select('*')
        .from(BandDatabase.TABLE_NAME)
        .where({id: input})
        .orWhere({name: input})

        if(!band[0]) {
            throw new Error("Unable to find band")
        }

        return Band.toBandModel(band[0])!
    }
}