import { HttpStatusCode } from "../constants/http-status-code.enum";

export interface IBaseError {
    name: string;
    httpCode: HttpStatusCode;
    description: string;
    isOperational: boolean;
}