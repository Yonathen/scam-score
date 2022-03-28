import { Sequelize } from "sequelize-typescript";
import { connect } from "../../config/db.config";
import { APIError } from "../helper/error/api.error";
import { ScamScoreAnalysis } from "../model/scam-score-analysis.model";

export class ScamScoreAnalysisService {
    sequelize: Sequelize;
    analysisRepository:any;

    constructor() {
        this.sequelize = connect();
        this.analysisRepository = this.sequelize.getRepository(ScamScoreAnalysis);
    }

    async createAnalysis(analysis: ScamScoreAnalysis) {
        try {
            return await this.analysisRepository.create(analysis);
        } catch(err: any) {
            throw new APIError({ description: err.message});
        }
    }
}