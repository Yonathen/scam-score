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

                    const scamScore: IScamScore = await this.virusTotalController.getScamScore(url);

                    res.status(200).send(scamScore);
                } catch(error) {
                    next(error);
                }
            })
    }
}