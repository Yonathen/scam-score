import express, { Application, Request, Response } from 'express';
import { Server, createServer } from 'http';

import { RoutesConfig } from './routes/routes.config';
import { ScamScoreRoutes } from './routes/scam-score.config';

import { publicConfig } from '../config/public.config';

import { logger } from './helper/logger';

const app: Application = express();
const server: Server = createServer(app);
const { port } = publicConfig;

const routes: Array<RoutesConfig> = [
    new ScamScoreRoutes(app)
];

app.get('/', (req: Request, res: Response) => {
    res.status(200).send(`Server running at http://localhost:${port}`);
});

server.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
    
});