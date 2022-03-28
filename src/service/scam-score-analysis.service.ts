import { Sequelize } from "sequelize-typescript";
import { connect } from "../../config/db.config";
import { APIError } from "../helper/error/api.error";
import { IScamScore } from "../interface/scam-score.interface";
import { ScamScoreAnalysis } from "../model/scam-score-analysis.model";

export class ScamScoreAnalysisService {
    sequelize: Sequelize;
    analysisRepository:any;

    constructor() {
        this.sequelize = connect();
        this.sequelize.sync({ force: true });
        this.analysisRepository = this.sequelize.getRepository(ScamScoreAnalysis);
    }

    async createAnalysis(analysis: IScamScore) {
        try {
            return await this.analysisRepository.create(analysis);
        } catch(err: any) {
            throw new APIError({ description: err.message});
        }
    }
}