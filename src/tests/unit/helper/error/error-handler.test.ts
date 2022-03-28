import * as winston from "winston";
import { logger } from "../../../../helper/logger";
import { errorHandler } from "../../../../helper/error/error-handler";
import { APIError } from "../../../../helper/error/api.error";


describe('logger', () => {
    it('should call logger error function', () => {
        const loggerSpy = jest.spyOn(logger, 'error');
        const error: Error = new Error(`Testing Error handler`);
        errorHandler.handleError(error);

        expect(loggerSpy).toHaveBeenCalledWith('ErrorHandler : handleError :', error);
    });

    describe('the check for trusted error', () => {
        
        
        it('returns true if error is instanceof BaseError and is operational', () => {
            const apiError = new APIError();
            const isTrusted = errorHandler.isTrustedError(apiError);

            expect(isTrusted).toBe(true);
        });

        it('returns false if error is instanceof BaseError and is not operational', () => {
            const apiError = new APIError({ isOperational: false });
            const isTrusted = errorHandler.isTrustedError(apiError);

            expect(isTrusted).toBe(false);
        }); 

        it('returns false if error is not an instanceof BaseError', () => {
            const error = new Error(`Non base error`);
            const isTrusted = errorHandler.isTrustedError(error);

            expect(isTrusted).toBe(false);
        }); 
    })
});