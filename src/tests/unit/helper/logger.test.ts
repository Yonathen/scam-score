import * as winston from "winston";
import { logger } from "../../../helper/logger";

  
jest.mock("winston", () => ({
    format: {
        colorize: jest.fn(),
        combine: jest.fn(),
        label: jest.fn(),
        timestamp: jest.fn(),
        printf: jest.fn(),
        json: jest.fn()
    },
    createLogger: jest.fn().mockReturnValue({
        debug: jest.fn(),
        log: jest.fn(),
        info: jest.fn()
    }),
    transports: {
        Console: jest.fn()
    }
}));

describe('logger', () => {
    it('should call log function', () => {
        const createLoggerSpy = jest.spyOn(winston, 'createLogger');

        logger.info('Test create logger');

        expect(createLoggerSpy).toHaveBeenCalled();

        createLoggerSpy.mockRestore();
    })
});