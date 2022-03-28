import express, { Application, Request, Response } from 'express';
import { Server, createServer } from 'http';

import { RoutesConfig } from './routes/routes.config';
import { ScamScoreRoutes } from './routes/scam-score.config';

import { publicConfig } from '../config/public.config';

import { logger } from './helper/logger';
import { errorHandler } from './helper/error/error-handler';

import swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

const app: Application = express();
const server: Server = createServer(app);
const { port } = publicConfig;

const routes: Array<RoutesConfig> = [
    new ScamScoreRoutes(app)
];

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello World',
        version: '1.0.0',
      },
    },
    apis: ['./src/routes/*.config.ts'], // files containing annotations as above
  };
const swaggerSpec = swaggerJSDoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Server running at http://localhost:${port}`);
});

server.listen(port, async () => {
    logger.info(`Server running at http://localhost:${port}`);
});

process.on('unhandledRejection', (reason: Error, promise: Promise<any>) => {
    throw reason;
});

process.on('uncaughtException', (error: Error) => {
    errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) {
        process.exit(1);
    }
});