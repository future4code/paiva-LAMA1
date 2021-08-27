import { ShowDataDTO } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export interface ShowDatabaseBase {
    createShow(data: ShowDataDTO): Promise<void>;
    checkSameDate(
        week_day: string,
        start_time: number,
        end_time: number
    ): Promise<any>;
    getShowsByDay(week_day: string): Promise<any[] | []>;
}

export class ShowDatabase extends BaseDatabase implements ShowDatabaseBase {
    private static TABLE_NAME = "lama_shows";

    public async createShow(data: ShowDataDTO): Promise<void> {
        try {
            await this.getConnection().insert(data).into(ShowDatabase.TABLE_NAME);
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async checkSameDate(
        week_day: string,
        start_time: number,
        end_time: number
    ): Promise<any> {
        try {
            const [result] = await this.getConnection()
                .select("*")
                .table(ShowDatabase.TABLE_NAME)
                .where({ week_day, start_time, end_time });

            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getShowsByDay(week_day: string): Promise<any[] | []> {
        try {
            const result = await this.getConnection()
                .select("name", "music_genre")
                .from("lama_bands as lb")
                .join("lama_shows as ls", "ls.band_id", "lb.id")
                .where({ week_day })
                .orderBy("ls.start_time", "asc");

            return result;
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
}

export default new ShowDatabase();