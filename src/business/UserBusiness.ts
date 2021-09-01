import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase, UserDatabaseBase } from "../data/UserDatabase";
import { IdGenerator, IdGeneratorBase } from "../services/IdGenerator";
import { HashManager, HashManagerBase } from "../services/HashManager";
import { Authenticator, AuthenticatorBase } from "../services/Authenticator";
import { CustomError } from "../error/CustomError";
import { UserRole } from "../model/User";

export class UserBusiness {
    constructor(
        private authenticator: AuthenticatorBase,
        private hashManager: HashManagerBase,
        private idGenerator: IdGeneratorBase,
        private userDatabase: UserDatabaseBase
      ) {
        
      }

    async createUser(user: UserInputDTO) {

        if (!user.email || !user.name || !user.password || !user.role) {
            throw new CustomError(
                "All fields must be filled: 'email', 'name', 'password' and 'role'",
                422
            );
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(user.email)) {
            throw new CustomError("Invalid email", 422);
        }

        const passwordRegex =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{6,}$/;
        if (!passwordRegex.test(user.password)) {
            throw new CustomError(
                "The password must have at least six characters with at least one lowercase letter, one uppercase letter, one number and one special character",
                422
            );
        }

        if (!(user.role in UserRole)) {
            throw new CustomError("Invalid user role", 422);
        }

        const id = this.idGenerator.generate();

        const hashPassword = this.hashManager.hash(user.password);

        
        await this.userDatabase.createUser(
            id,
            user.email,
            user.name,
            hashPassword,
            user.role
          );

        const accessToken = this.authenticator.generateToken({
            id,
            role: user.role,
          });

        return accessToken;
    }

    async getUserByEmail(user: LoginInputDTO) {

        const userFromDB = await this.userDatabase.getUserByEmail(user.email);
        if (!userFromDB) {
            throw new CustomError("Invalid credentials", 401);
        }
        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

        if (!hashCompare) {
            throw new CustomError("Invalid credentials", 401);
        }

        const accessToken = this.authenticator.generateToken({
            id: userFromDB.getId(),
            role: userFromDB.getRole(),
          });
          
        return accessToken;
    }
}