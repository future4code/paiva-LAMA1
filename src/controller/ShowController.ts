import { Request, Response } from "express";
import { ShowInputDTO } from "../model/Show";
import showBusiness from "../business/ShowBussiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class ShowController {
  async scheduleShow(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;

      const input: ShowInputDTO = {
        bandId: req.body.bandId,
        date: req.body.date,
        endTime: req.body.endTime,
        startTime: req.body.startTime,
        weekDay: req.body.weekDay,
      };

      const message = await showBusiness.scheduleShow(input, token);

      res.status(200).send({ message });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  async getShows(req: Request, res: Response) {
    try {
      const token = req.headers.authorization;

      const weedDay: string = req.body.weekDay;

      const bands = await showBusiness.getShows(weedDay, token);

      res.status(200).send({ bands });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
}