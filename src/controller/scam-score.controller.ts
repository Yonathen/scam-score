import { VirusTotalService } from "../service/virus-total.service";
import { logger } from "../helper/logger";
import { IScamScore } from "../interface/scam-score.interface";


export class VirusTotalController {

    virusTotalService: VirusTotalService;

    constructor() {
        this.virusTotalService = new VirusTotalService();
    }

    async getScamScore(url: any): Promise<IScamScore> {
        logger.info(`Controller : getScamScore : ${url}`);
        return await this.virusTotalService.calculateScamScore(url);
    }
}