import { CustomError } from "./CustomError";

export class InvalidInfoError extends CustomError {
    constructor(
        message: string
    ) { super(message, 400) }
}