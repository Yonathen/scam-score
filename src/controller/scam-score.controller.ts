import { VirusTotalService } from "../service/virus-total.service";
import { logger } from "../helper/logger";
import { IScamScore } from "../interface/scam-score.interface";
import { ScamScoreAnalysis } from "../model/scam-score-analysis.model";
import { ScamScoreAnalysisService } from "../service/scam-score-analysis.service";


export class VirusTotalController {

    virusTotalService: VirusTotalService;
    scamScoreAnalysisService: ScamScoreAnalysisService;

    constructor() {
        this.virusTotalService = new VirusTotalService();
        this.scamScoreAnalysisService = new ScamScoreAnalysisService();
    }

    async getScamScore(url: any): Promise<IScamScore> {
        logger.info(`Controller : getScamScore : ${url}`);
        const scamScore: IScamScore = await this.virusTotalService.calculateScamScore(url);
        return await this.scamScoreAnalysisService.createAnalysis(scamScore);
    }
}