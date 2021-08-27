import { ShowDatabaseBase } from "../../src/data/ShowDatabase";
import { ShowDataDTO } from "../../src/model/Show";

export class ShowDatabaseMock implements ShowDatabaseBase {
  public async createShow(data: ShowDataDTO): Promise<any> {}

  public async checkSameDate(
    week_day: string,
    start_time: number,
    end_time: number
  ): Promise<any> {
    if (week_day === "FRIDAY" && start_time === 11 && end_time === 12) {
      return {};
    }
    return undefined;
  }

  public async getShowsByDay(week_day: string): Promise<any[] | []> {
    if (week_day === "FRIDAY") {
      return [
        { name: "Dio", genre: "Metal" },
        { name: "Queen", genre: "Rock" },
      ];
    }

    return [];
  }
}

export default new ShowDatabaseMock();