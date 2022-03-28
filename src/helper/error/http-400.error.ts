import { HttpStatusCode } from "../../constants/http-status-code.enum";
import { BaseError } from "./base.error";

export class HTTP400Error extends BaseError {
    constructor(description = 'bad request') {
      super({name: 'NOT FOUND', httpCode: HttpStatusCode.BAD_REQUEST, isOperational: true, description});
    }
}