import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class BandController {
    public async signupBand(req: Request, res: Response) {
        try {
            const input: BandInputDTO = {
                name: req.body.name,
                genre: req.body.genre,
                responsible: req.body.responsible
            }

            const bandBusiness = new BandBusiness(
                new BandDatabase,
                new IdGenerator,
                new Authenticator
            )


            const token = req.headers.authorization as string

            await bandBusiness.signupBand(input, token)

            res.sendStatus(200)
        } catch (error) {
            res.status(400).send(error.message)
        } finally {
            await BaseDatabase.destroyConnection()
        }

    }

    public async getDetails(req: Request, res: Response) {
        try {
            const input = (req.query.id || req.query.name) as string

            const bandBusiness = new BandBusiness(
                new BandDatabase,
                new IdGenerator,
                new Authenticator
            )

            const band = await bandBusiness.getDetails(input)

            res.status(200).send(band)
        } catch (error) {
            res.status(400).send(error.message)
        } finally {
            await BaseDatabase.destroyConnection()
        }
    }
}