import { HttpStatusCode } from "../../constants/http-status-code.enum";
import { BaseError } from "./base.error";

export class APIError extends BaseError {
    constructor({name = '', httpCode = HttpStatusCode.INTERNAL_SERVER, isOperational = true, description = 'internal server error'} = {}) {
      super({name, httpCode, description, isOperational});
    }
}