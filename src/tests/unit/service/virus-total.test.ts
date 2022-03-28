import { VirusTotalService } from '../../../service/virus-total.service';
import { mockedAnalysis, mockedPayload } from '../../../helper/constants/mock-analysis.constant';


import axios from 'axios';

jest.mock('axios');

describe('Virus total service', () => {
    
    const axiosSpyOn = jest.spyOn(axios, 'get');

    beforeEach(() => {
        axiosSpyOn.mockImplementationOnce(() => Promise.resolve(mockedPayload));
     });

    afterEach(() => {
        jest.resetAllMocks()
    });

    it('should load virus payload and calculate the scam score', async () => {
        
        const virusTotalService = new VirusTotalService();
        const res = await virusTotalService.calculateScamScore('http://www.google.com');

        expect(res).toEqual({...mockedAnalysis, lastAnalysisDate: new Date(mockedAnalysis.lastAnalysisDate)});
    });
})
