import { UserBusiness } from "../src/business/UserBusiness";
import { LoginInputDTO, UserInputDTO } from "../src/model/User";
import  TokenGeneratorMock  from "./mocks/TokenGeneratorMock";
import  HashGeneratorMock  from "./mocks/HashGeneratorMock";
import  IdGeneratorMock  from "./mocks/IdGeneratorMock";
import  UserDatabaseMock  from "./mocks/UserDatabaseMock";

const userBusinessMock = new UserBusiness(
    TokenGeneratorMock,
    HashGeneratorMock,
    IdGeneratorMock,
    UserDatabaseMock
  );


describe("UserBusiness", () => {
    describe("signUp", () => {
        test("Should catch error when name is empty", async () => {
            expect.assertions(2);

            try {
                const data: UserInputDTO = {
                    email: "test@mail.com",
                    name: "",
                    password: "assadas@1132",
                    role: "NORMAL",
                };

                await userBusinessMock.createUser(data);
            } catch (error) {
                expect(error.statusCode).toBe(422);
                expect(error.message).toBe(
                    "All fields must be filled: 'email', 'name', 'password' and 'role'"
                );
            }
        });

        test("Should catch error when email is invalid", async () => {
            expect.assertions(2);

            try {
                const data: UserInputDTO = {
                    email: "testail.com",
                    name: "teste",
                    password: "assadas@1132",
                    role: "NORMAL",
                };

                await userBusinessMock.createUser(data);
            } catch (error) {
                expect(error.statusCode).toBe(422);
                expect(error.message).toBe("Invalid email");
            }
        });

        test("Should catch error when password is invalid", async () => {
            expect.assertions(2);

            try {
                const data: UserInputDTO = {
                    email: "test@mail.com",
                    name: "teste",
                    password: "assa",
                    role: "NORMAL",
                };

                await userBusinessMock.createUser(data);
            } catch (error) {
                expect(error.statusCode).toBe(422);
                expect(error.message).toBe(
                    "The password must have at least six characters with at least one lowercase letter, one uppercase letter, one number and one special character"
                );
            }
        });

        test("Should catch error when role is invalid", async () => {
            expect.assertions(2);

            try {
                const data: UserInputDTO = {
                    email: "test@mail.com",
                    name: "teste",
                    password: "assA@154",
                    role: "GUEST",
                };

                await userBusinessMock.createUser(data);
            } catch (error) {
                expect(error.statusCode).toBe(422);
                expect(error.message).toBe("Invalid user role");
            }
        });

        test("Should return access token on sucessful signup", async () => {
            expect.assertions(1);

            try {
                const data: UserInputDTO = {
                    email: "test@mail.com",
                    name: "teste",
                    password: "assA@154",
                    role: "NORMAL",
                };

                const accessToken = await userBusinessMock.createUser(data);

                expect(accessToken).toBe("token_mock");
            } catch (error) {
                console.log(error.message);
            }
        });
    });

    describe("login", () => {
        test("Should catch error when email is not registered", async () => {
            expect.assertions(2);

            try {
                const data: LoginInputDTO = {
                    email: "astrodev22@mail.com",
                    password: "123456",
                };
                await userBusinessMock.getUserByEmail(data);
            } catch (error) {
                expect(error.statusCode).toBe(401);
                expect(error.message).toBe("Invalid credentials");
            }
        });

        test("Should catch error when password is incorrect", async () => {
            expect.assertions(2);

            try {
                const data: LoginInputDTO = {
                    email: "astrodev@mail.com",
                    password: "12346",
                };

                await userBusinessMock.getUserByEmail(data);
            } catch (error) {
                expect(error.statusCode).toBe(401);
                expect(error.message).toBe("Invalid credentials");
            }
        });

        test("Should return access token on sucessful login", async () => {
            expect.assertions(1);

            try {
                const data: LoginInputDTO = {
                    email: "astrodev@mail.com",
                    password: "astrodev123",
                };
                const accessToken = await userBusinessMock.getUserByEmail(data);

                expect(accessToken).toBe("token_mock");
            } catch (error) {
                console.log(error.message);
            }
        });
    });
});