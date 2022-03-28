import { Application, NextFunction, Request, Response } from "express";
import { RoutesConfig } from "./routes.config";
import { logger } from "../helper/logger";
import { VirusTotalController } from "../controller/scam-score.controller";
import { IScamScore } from "../interface/scam-score.interface";

export class ScamScoreRoutes extends RoutesConfig {

    private virusTotalController: VirusTotalController;

    constructor(app: Application) {
        super(app, 'ScamScore');

        this.virusTotalController = new VirusTotalController();
    }

    routes() {
        this.app.route(`/scamscore`)
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { url = '' } = req.query || {};
                    logger.info(`ScamScoreRoutes : scamscore : ${url}`);

                    const scamScore: IScamScore = await this.virusTotalController.getSaveScamScore(url);

                    res.status(200).send(scamScore);
                } catch(error) {
                    next(error);
                }
            });

        this.app.route(`/analyses`)
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    logger.info(`ScamScoreRoutes : analyses `);

                    const analysis: Array<IScamScore> = await this.virusTotalController.getAnalyses();

                    res.status(200).send(analysis);
                } catch(error) {
                    next(error);
                }
            });

        this.app.route(`/analyses/range`)
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { from = '', to = '' } = req.query || {};
                    logger.info(`ScamScoreRoutes : analyses : range : ${from} : ${to}`);

                    const startDate: Date = new Date(from.toString());
                    const endDate: Date = new Date(to.toString());
                    const analysis: Array<IScamScore> = await this.virusTotalController.getFromToAnalyses(startDate, endDate);

                    res.status(200).send(analysis);
                } catch(error) {
                    next(error);
                }
            });
    }
}