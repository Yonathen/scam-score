import { Application, Request, Response } from "express";
import { RoutesConfig } from "./routes.config";

export class ScamScoreRoutes extends RoutesConfig {

    constructor(app: Application) {
        super(app, 'ScamScore');
    }

    routes() {
        this.app.route(`/scamscore`)
            .get((req: Request, res: Response) => {
                res.status(200).send(`GET request : SCAMscore`);
            })
    }
}