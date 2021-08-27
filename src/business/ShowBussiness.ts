import showDatabase, { ShowDatabaseBase } from "../data/ShowDatabase";
import { CustomError } from "../error/CustomError";
import { Show, ShowInputDTO, WeekDay } from "../model/Show";
import { AuthenticatorBase } from "../services/Authenticator";
import{ IdGeneratorBase } from "../services/IdGenerator";

export class ShowBusiness {
  constructor(
    private authenticator: AuthenticatorBase,
    private idGenerator: IdGeneratorBase,
    private showDatabase: ShowDatabaseBase
  ) {
    
  }

  async scheduleShow(show: ShowInputDTO, token: string | undefined) {
    this.validateToken(token);

    if (!(show.weekDay in WeekDay)) {
      throw new CustomError("Week day invalid", 422);
    }

    if (show.startTime < 8 || show.startTime > 22 || show.endTime < 9 || show.endTime > 23) {
      throw new CustomError("Range time invalid", 422);
    }

    if (typeof show.startTime !== "number" || typeof show.endTime !== "number") {
      throw new CustomError("Invalid time", 422);
    }

    const result = await this.showDatabase.checkSameDate(
      show.weekDay,
      show.startTime,
      show.endTime
    );

    if (result) {
      throw new CustomError("Date is already scheduled", 403);
    }

    const id = this.idGenerator.generate();

    const date = this.formatInputData(show.date);

    const weekDay = Show.stringToWeekDay(show.weekDay);

    const newShow = new Show(
      id,
      weekDay,
      date,
      show.startTime,
      show.endTime,
      show.bandId
    );

    await this.showDatabase.createShow(newShow.showToDatabase());

    return "Show scheduled successfully!";
  }

  async getShows(weekDay: string, token: string | undefined) {
    this.validateToken(token);

    if (!(weekDay in WeekDay)) {
      throw new CustomError("Week day is invalid", 422);
    }
    const bands = await this.showDatabase.getShowsByDay(weekDay);

    return bands;
  }

  private validateToken(token: string | undefined) {
    if (!token) {
      throw new CustomError("Unauthorized", 401);
    }

    this.authenticator.getData(token);
  }

  private formatInputData(data: string): string {
    let splitDate = data.split(/\D/);
    return splitDate.reverse().join("-");
  }
}