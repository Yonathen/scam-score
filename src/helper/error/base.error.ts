import { HttpStatusCode } from "../../constants/http-status-code.enum";
import { IBaseError } from "../../interface/base-error.interface";

export class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;
    
    constructor({ name, httpCode, description, isOperational}: IBaseError) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
    
      this.name = name;
      this.httpCode = httpCode;
      this.isOperational = isOperational;
    
      Error.captureStackTrace(this);
    }
}