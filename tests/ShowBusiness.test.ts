import { ShowBusiness } from "../src/business/ShowBussiness";
import { ShowInputDTO } from "../src/model/Show";
import IdGeneratorMock from "./mocks/IdGeneratorMock";
import ShowDatabaseMock from "./mocks/ShowDatabaseMock";
import TokenGeneratorMock from "./mocks/TokenGeneratorMock";

const showBusinessMock = new ShowBusiness(
  TokenGeneratorMock,
  IdGeneratorMock,
  ShowDatabaseMock
);

describe("ShowBusiness", () => {
  describe("showSchedule", () => {
    test("Should catch error when token is empty", async () => {
      expect.assertions(2);

      try {
        const input: ShowInputDTO = {
          weekDay: "FRIDAY",
          date: "30/06/2021",
          startTime: 9,
          endTime: 11,
          bandId: "Coldplay",
        };

        await showBusinessMock.scheduleShow(input, undefined);
      } catch (error) {
        expect(error.statusCode).toBe(401);
        expect(error.message).toBe("Unauthorized");
      }
    });

    test("Should catch error when week day is not FRIDAY, SATURDAY or SUNDAY", async () => {
      expect.assertions(2);

      try {
        const input: ShowInputDTO = {
          weekDay: "TANANA",
          date: "30/06/2021",
          startTime: 9,
          endTime: 11,
          bandId: "Coldplay",
        };

        await showBusinessMock.scheduleShow(input, "token");
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Week day invalid");
      }
    });

    test("Should catch error when range time is incorrect", async () => {
      expect.assertions(2);

      try {
        const input: ShowInputDTO = {
          weekDay: "FRIDAY",
          date: "30/06/2021",
          startTime: 6,
          endTime: 11,
          bandId: "Dio",
        };

        await showBusinessMock.scheduleShow(input, "token");
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Range time invalid");
      }
    });

    test("Should catch error when hour is not a number", async () => {
      expect.assertions(2);

      try {
        const incorrectHour: any = "9:30";

        const input: ShowInputDTO = {
          weekDay: "FRIDAY",
          date: "30/06/2021",
          startTime: incorrectHour,
          endTime: 11,
          bandId: "Dio",
        };

        await showBusinessMock.scheduleShow(input, "token");
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Invalid time");
      }
    });

    test("Should catch error when date is already scheduled", async () => {
      expect.assertions(2);

      try {
        const input: ShowInputDTO = {
          weekDay: "FRIDAY",
          date: "30/06/2021",
          startTime: 11,
          endTime: 12,
          bandId: "Dio",
        };

        await showBusinessMock.scheduleShow(input, "token");
      } catch (error) {
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe("Date is already scheduled");
      }
    });

    test("Should return successful message", async () => {
      expect.assertions(1);

      try {
        const input: ShowInputDTO = {
          weekDay: "FRIDAY",
          date: "30/06/2021",
          startTime: 15,
          endTime: 16,
          bandId: "Dio",
        };

        const result = await showBusinessMock.scheduleShow(input, "token");

        expect(result).toBe("Show scheduled successfully!");
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("GetShows", () => {
    test("Should catch error when week day is invalid", async () => {
      expect.assertions(2);

      try {
        await showBusinessMock.getShows("WEDNESDAY", "token");
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Week day is invalid");
      }
    });

    test("Should return bands", async () => {
      expect.assertions(2);

      try {
        const result = await showBusinessMock.getShows("FRIDAY", "token");

        expect(result).toContainEqual({ name: "Dio", genre: "Metal" });
        expect(result).toContainEqual({ name: "Queen", genre: "Rock" });
      } catch (error) {
        console.log(error);
      }
    });
  });
});