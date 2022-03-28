import { Sequelize } from "sequelize-typescript";
import { connect } from "../../config/db.config";
import { APIError } from "../helper/error/api.error";
import { logger } from "../helper/logger";
import { IScamScore } from "../interface/scam-score.interface";
import { ScamScoreAnalysis } from "../model/scam-score-analysis.model";
import { Op } from "sequelize";
export class ScamScoreAnalysisService {
    sequelize: Sequelize;
    analysisRepository:any;

    constructor() {
        this.sequelize = connect();
        // this.sequelize.sync({ force: true });
        this.analysisRepository = this.sequelize.getRepository(ScamScoreAnalysis);
    }

    async createAnalysis(analysis: IScamScore) {
        try {
            return await this.analysisRepository.create(analysis);
        } catch(err: any) {
            throw new APIError({ description: err.message});
        }
    }

    async getAnalyses() {
        try {
            const analyses = await this.analysisRepository.findAll();
            logger.info('ScamScoreAnalysisService : getAnalyses :', analyses);
            return analyses;
        } catch (err) {
            throw new APIError({ description: err.message});
        }
    }

    async getFromToAnalyses(startDate: Date, endDate: Date) {
        try {
            const where = { createdAt: { [Op.between]: [startDate, endDate] } };
            const analyses = await this.analysisRepository.findAll({where});
            logger.info('ScamScoreAnalysisService : getFromToAnalyses :', analyses);
            return analyses;
        } catch (err) {
            throw new APIError({ description: err.message});
        }
    }
}