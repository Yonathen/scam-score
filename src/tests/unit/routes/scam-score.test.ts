import request from 'supertest';
import express from 'express';
import { ScamScoreRoutes } from '../../../routes/scam-score.config';
import { VirusTotalController } from "../../../controller/scam-score.controller";
import { mockedAnalysis } from '../../../helper/constants/mock-analysis.constant';


const app = express();
const route = new ScamScoreRoutes(app);

describe('Scam score configuration', () => {


    beforeEach(() => {
        VirusTotalController.prototype.constructor = jest.fn().mockImplementation(() => {});
    });

    afterEach(() => {
        jest.resetAllMocks()
    });

    it('should invoke load and save scam score', async () => {
        VirusTotalController.prototype.getSaveScamScore = jest.fn().mockReturnValue(mockedAnalysis);
        const res = await request(app).get('/scamscore?url=http://www.google.com');
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.text)).toEqual(mockedAnalysis);
    });


    it('should invoker getAnalyses controller method', async () => {
        VirusTotalController.prototype.getAnalyses = jest.fn().mockReturnValue([mockedAnalysis]);
        const res = await request(app).get('/analyses');
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.text)).toEqual([mockedAnalysis]);
    });


    it('should invoke getFromToAnalyses controller method', async () => {
        VirusTotalController.prototype.getFromToAnalyses = jest.fn().mockReturnValue([mockedAnalysis]);
        const res = await request(app).get('/analyses/range');
        expect(res.statusCode).toBe(200);
        expect(JSON.parse(res.text)).toEqual([mockedAnalysis]);
    });
})
