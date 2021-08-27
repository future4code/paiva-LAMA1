import { BandDatabaseBase} from "../../src/data/BandDatabase";
import { Band } from "../../src/model/Band";
import { bandMock } from "./BandMock";

export class BandDatabaseMock implements BandDatabaseBase {
    public async signupBand(band: Band): Promise<void> {

    }

    public async getDetails(): Promise<Band | undefined> {
        if ("id_mock" || "LED Zé Pelinho") {
            return bandMock
        }
        else {
            return undefined
        }
    }


}

export default new BandDatabaseMock()