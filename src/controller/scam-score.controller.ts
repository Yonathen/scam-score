import { VirusTotalService } from "../service/virus-total.service";
import { logger } from "../helper/logger";
import { IScamScore } from "../interface/scam-score.interface";
import { ScamScoreAnalysisService } from "../service/scam-score-analysis.service";


export class VirusTotalController {

    virusTotalService: VirusTotalService;
    scamScoreAnalysisService: ScamScoreAnalysisService;

    constructor() {
        this.virusTotalService = new VirusTotalService();
        this.scamScoreAnalysisService = new ScamScoreAnalysisService();
    }

    async getSaveScamScore(url: any): Promise<IScamScore> {
        logger.info(`Controller : getSaveScamScore : ${url}`);
        const scamScore: IScamScore = await this.virusTotalService.calculateScamScore(url);
        return await this.scamScoreAnalysisService.createAnalysis(scamScore);
    }

    async getAnalyses(): Promise<Array<IScamScore>> {
        logger.info(`Controller : getAnalyses`);
        return await this.scamScoreAnalysisService.getAnalyses();
    }

    async getFromToAnalyses(startDate: Date, endDate: Date): Promise<Array<IScamScore>> {
        logger.info(`Controller : getFromToAnalyses`);
        return await this.scamScoreAnalysisService.getFromToAnalyses(startDate, endDate);
    }
}