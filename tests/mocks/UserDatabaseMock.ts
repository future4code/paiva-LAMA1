import { UserDatabaseBase } from "../../src/data/UserDatabase";
import { User } from "../../src/model/User";
import { userMockAdm, userMockNormal } from "./userMock";

export class UserDatabaseMock implements UserDatabaseBase {
   public async createUser(
      id: string,
      email: string,
      name: string,
      password: string,
      role: string
    ): Promise<void> {}
  
    public async getUserByEmail(email: string): Promise<User | undefined> {
      switch (email) {
        case "astrodev@mail.com":
          return userMockAdm;
        case "pedro@mail.com":
          return userMockNormal;
        default:
          return undefined;
      }
    }
  }

export default new UserDatabaseMock();