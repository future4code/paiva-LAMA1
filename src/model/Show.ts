import { CustomError } from "../error/CustomError";

export class Show {
  constructor(
    private id: string,
    private weekDay: WeekDay,
    private date: string,
    private startTime: number,
    private endTime: number,
    private bandId: string
  ) {}

  getId() {
    return this.id;
  }

  getWeekDay() {
    return this.weekDay;
  }

  getDate() {
    return this.date;
  }

  getStartTime() {
    return this.startTime;
  }

  getEndTime() {
    return this.endTime;
  }

  getBandId() {
    return this.bandId;
  }

  setId(id: string) {
    this.id = id;
  }

  setWeekDay(week_day: WeekDay) {
    this.weekDay = week_day;
  }

  setDate(date: string) {
    this.date = date;
  }

  setStartTime(start_time: number) {
    this.startTime = start_time;
  }

  setEndTime(end_time: number) {
    this.endTime = end_time;
  }

  setBandId(band_id: string) {
    this.bandId = band_id;
  }

  static stringToWeekDay(input: string): WeekDay {
    switch (input) {
      case "FRIDAY":
        return WeekDay.FRIDAY;
      case "SATURDAY":
        return WeekDay.SATURDAY;
      case "SUNDAY":
        return WeekDay.SUNDAY;
      default:
        throw new CustomError("Invalid week day", 422);
    }
  }

  static toShowModel(show: any): Show {
    return new Show(
      show.id,
      Show.stringToWeekDay(show.week_day),
      show.date,
      show.start_time,
      show.end_time,
      show.band_id
    );
  }

  public showToDatabase(): ShowDataDTO {
    return {
      id: this.id,
      week_day: this.weekDay,
      start_time: this.startTime,
      end_time: this.endTime,
      band_id: this.bandId,
      date: this.date,
    };
  }
}

export interface ShowInputDTO {
  weekDay: string;
  date: string;
  startTime: number;
  endTime: number;
  bandId: string;
}

export interface ShowDataDTO {
  id: string;
  week_day: string;
  date: string;
  start_time: number;
  end_time: number;
  band_id: string;
}

export enum WeekDay {
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}