import { logger } from "../logger";
import { BaseError } from "./base.error";

class ErrorHandler {
    public async handleError(error: Error): Promise<void> {
        await logger.error( 'ErrorHandler : handleError :', error );
    }

    public isTrustedError(error: Error) {
        if (error instanceof BaseError) {
            return error.isOperational;
        }
        return false;
    }
}

export const errorHandler = new ErrorHandler();