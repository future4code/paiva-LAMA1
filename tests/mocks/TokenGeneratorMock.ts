import { UserRole } from "../../src/model/User";
import { AuthenticatorBase } from "../../src/services/Authenticator";

export class TokenGeneratorMock implements AuthenticatorBase {
    public generateToken = (input: AuthenticationData): string => {
    return "token_mock";
  };

  public getData(token: string) {
    if (token === "admin") {
      return {
        id: "id_mock",
        role: UserRole.ADMIN,
      };
    } else {
      return {
        id: "id_mock",
        role: UserRole.NORMAL,
      };
    }
  }
}

interface AuthenticationData {
  id: string;
  role: string;
}

export default new TokenGeneratorMock();