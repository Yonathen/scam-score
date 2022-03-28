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
        /**
        * @swagger
        * /scamscore:
        *   get:
        *     summary: Load the payload from virus total and save it in database.
        *     description: Load the last_analysis_stats attribute from https://developers.virustotal.com/reference/url-info and save the calculated scam score in Postgres database located in ElephantSQL.
        *     responses:
        *       200:
        *         description: Newly created analysis.
        *         content:
        *           application/json:
        *             schema:
        *               type: object
        *               properties:
        *                       urlId:
        *                         type: string
        *                         description: The url ID for analysis.
        *                         example: 'aHR0cDovL3d3dy5nb29nbGUuY29t'
        *                       url:
        *                         type: string
        *                         description: The url for analysis.
        *                         example: 'http://www.google.com'
        *                       harmless:
        *                         type: integer
        *                         description: The url ID for analysis.
        *                         example: 85,
        *                       malicious:
        *                         type: integer
        *                         example: 0,
        *                       suspicious:
        *                         type: integer
        *                         example: 0,
        *                       undetected:
        *                         type: integer
        *                         example: 8,
        *                       timeout:
        *                         type: integer
        *                         example: 0,
        *                       totalResults:
        *                         type: integer
        *                         example: 93,
        *                       scamScore:
        *                         type: integer
        *                         example: 0,
        *                       lastAnalysisDate:
        *                         type: date
        *                         example: 1970-01-20T01:54:47.997Z'
        */
        this.app.route(`/scamscore`)
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { url = '' } = req.query || {};
                    logger.info(`ScamScoreRoutes : scamscore : ${url}`);

                    const scamScore: IScamScore = await this.virusTotalController.getSaveScamScore(url);
                    res.status(200);
                    res.json(scamScore);
                } catch(error) {
                    next(error);
                }
            });

        /**
        * @swagger
        * /analyses:
        *   get:
        *     summary: Load the list of analysis from database.
        *     description: Load the list of analysis from Postgres database located in ElephantSQL.
        *     responses:
        *       200:
        *         description: All the list of analysis executed.
        *         content:
        *           application/json:
        *             schema:
        *                   type: array
        *                   items:
        *                     type: object
        *                     properties:
        *                       id:
        *                         type: integer
        *                         example: 0,
        *                       urlId:
        *                         type: string
        *                         description: The url ID for analysis.
        *                         example: 'aHR0cDovL3d3dy5nb29nbGUuY29t'
        *                       url:
        *                         type: string
        *                         description: The url for analysis.
        *                         example: 'http://www.google.com'
        *                       harmless:
        *                         type: integer
        *                         description: The url ID for analysis.
        *                         example: 85,
        *                       malicious:
        *                         type: integer
        *                         example: 0,
        *                       suspicious:
        *                         type: integer
        *                         example: 0,
        *                       undetected:
        *                         type: integer
        *                         example: 8,
        *                       timeout:
        *                         type: integer
        *                         example: 0,
        *                       totalResults:
        *                         type: integer
        *                         example: 93,
        *                       scamScore:
        *                         type: integer
        *                         example: 0,
        *                       lastAnalysisDate:
        *                         type: date
        *                         example: 1970-01-20T01:54:47.997Z'
        */
        this.app.route(`/analyses`)
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    logger.info(`ScamScoreRoutes : analyses `);

                    const analysis: Array<IScamScore> = await this.virusTotalController.getAnalyses();

                    res.status(200);
                    res.json(analysis);
                } catch(error) {
                    next(error);
                }
            });

        /**
        * @swagger
        * /analyses/range:
        *   get:
        *     summary: Load the list of analysis with in the specified date range database.
        *     description: Load the list of analysis with in the specified date range from Postgres database located in ElephantSQL.
        *     parameters:
        *       - in: path
        *         name: from
        *         required: true
        *         schema:
        *           type: date
        *       - in: path
        *         name: to
        *         required: true
        *         schema:
        *           type: date
        *     responses:
        *       200:
        *         description: All the list of analysis executed.
        *         content:
        *           application/json:
        *             schema:
        *                   type: array
        *                   items:
        *                     type: object
        *                     properties:
        *                       id:
        *                         type: integer
        *                         example: 0,
        *                       urlId:
        *                         type: string
        *                         description: The url ID for analysis.
        *                         example: 'aHR0cDovL3d3dy5nb29nbGUuY29t'
        *                       url:
        *                         type: string
        *                         description: The url for analysis.
        *                         example: 'http://www.google.com'
        *                       harmless:
        *                         type: integer
        *                         description: The url ID for analysis.
        *                         example: 85,
        *                       malicious:
        *                         type: integer
        *                         example: 0,
        *                       suspicious:
        *                         type: integer
        *                         example: 0,
        *                       undetected:
        *                         type: integer
        *                         example: 8,
        *                       timeout:
        *                         type: integer
        *                         example: 0,
        *                       totalResults:
        *                         type: integer
        *                         example: 93,
        *                       scamScore:
        *                         type: integer
        *                         example: 0,
        *                       lastAnalysisDate:
        *                         type: date
        *                         example: 1970-01-20T01:54:47.997Z'
        */
        this.app.route(`/analyses/range`)
            .get(async (req: Request, res: Response, next: NextFunction) => {
                try {
                    const { from = '', to = '' } = req.query || {};
                    logger.info(`ScamScoreRoutes : analyses : range : ${from} : ${to}`);

                    const startDate: Date = new Date(from.toString());
                    const endDate: Date = new Date(to.toString());
                    const analysis: Array<IScamScore> = await this.virusTotalController.getFromToAnalyses(startDate, endDate);

                    res.status(200);
                    res.json(analysis);
                } catch(error) {
                    next(error);
                }
            });
    }
}