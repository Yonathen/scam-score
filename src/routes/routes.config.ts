import express, { Application, Request, Response, NextFunction } from 'express';
import { EXPRESS_LOGGER_OPTION } from '../helper/logger';
import {errorLogger, logger} from 'express-winston';
import cors from 'cors';
import {json} from 'body-parser';
import { errorHandler } from '../helper/error/error-handler';
import { BaseError } from '../helper/error/base.error';

export abstract class RoutesConfig {
    private _app: Application;
    
    name: string;

    get app(): Application {
        return this._app;
    }

    constructor(app: Application, name: string) {
        this._app = app;
        this.name = name;

        this.configure();
        this.routes();
    }

    configure(): void {
        this.app.use(json());
        this.app.use(cors());
    
        this.app.use(logger(EXPRESS_LOGGER_OPTION));
        this.app.use(errorLogger(EXPRESS_LOGGER_OPTION));
        this.app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
            if (!errorHandler.isTrustedError(err)) {
              next(err);
            }
            await errorHandler.handleError(err);
            res.status(err?.httpCode || 500).send(err.message)
        });
    }

    abstract routes(): void;
}