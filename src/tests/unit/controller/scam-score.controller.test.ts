import { VirusTotalController } from "../../../controller/scam-score.controller";
import { ScamScoreAnalysisService } from '../../../service/scam-score-analysis.service';
import { VirusTotalService } from '../../../service/virus-total.service';
import { mockedAnalysis } from '../../../helper/constants/mock-analysis.constant';


describe('Scam score controller', () => {
    

    beforeEach(() => {
        ScamScoreAnalysisService.prototype.constructor = jest.fn().mockImplementation(() => {});
    });

    afterEach(() => {
        jest.resetAllMocks()
    });

    it('should invoke the services load and save scam score', async () => {
        VirusTotalService.prototype.calculateScamScore = jest.fn().mockReturnValue(mockedAnalysis);
        ScamScoreAnalysisService.prototype.createAnalysis = jest.fn().mockReturnValue(mockedAnalysis);
        

        const virusTotalController = new VirusTotalController();
        const res = await virusTotalController.getSaveScamScore('http://www.google.com');

        expect(res).toEqual(mockedAnalysis);
        expect(ScamScoreAnalysisService.prototype.createAnalysis).toHaveBeenCalledWith(mockedAnalysis)
    });

    it('should invoke the service to get all the analyses', async () => {
        ScamScoreAnalysisService.prototype.getAnalyses = jest.fn().mockReturnValue([mockedAnalysis]);
        

        const virusTotalController = new VirusTotalController();
        const res = await virusTotalController.getAnalyses();

        expect(res).toEqual([mockedAnalysis]);
    });

    it('should invoke the service to get all the analyses with the given range', async () => {
        ScamScoreAnalysisService.prototype.getFromToAnalyses = jest.fn().mockReturnValue([mockedAnalysis]);
        

        const virusTotalController = new VirusTotalController();
        const res = await virusTotalController.getFromToAnalyses(new Date('1970-01-03'), new Date());

        expect(res).toEqual([mockedAnalysis]);
    });
})
