import axios, { AxiosRequestConfig } from "axios";

import base64url from 'base64url';
import { logger } from "../helper/logger";
import { publicConfig } from "../../config/public.config";
import { IScamScore } from "../interface/scam-score.interface";
import { APIError } from "../helper/error/api.error";

export class VirusTotalService {

    private request: AxiosRequestConfig;

    constructor() {
        this.request = {
            baseURL: publicConfig.virusTotalURL,
            headers: {
                'x-apikey': publicConfig.virusTotalApiKey
            }
        }
    }

    async fetchVirusTotal(url: string) {
        const virusTotalResponse = await axios.get(`/${url}`, this.request);
        if(!virusTotalResponse?.data?.data?.attributes) {
            throw new APIError();
        }
        const { data: {
            attributes: {
                last_analysis_date: lastAnalysisDate,
                last_analysis_stats: lastAnalysisStat 
            } 
        }} = virusTotalResponse?.data || {};

        return {lastAnalysisDate, lastAnalysisStat};
    }

    async calculateScamScore(url: string): Promise<IScamScore> {
        const urlId: string = base64url(url);
        const { lastAnalysisDate, lastAnalysisStat } = await this.fetchVirusTotal(urlId);
        
        const { harmless = 0, malicious = 0, suspicious = 1, undetected = 0, timeout = 0 } = lastAnalysisStat || {};
        const totalResults = harmless + malicious + suspicious + undetected + timeout;
        const scamScore = (100 / (totalResults - undetected - timeout) * (malicious + suspicious));
        logger.info(`VirusTotalService : calculateScamScore : ${scamScore}`);

        return { 
            url,
            urlId, 
            harmless,
            malicious,
            suspicious,
            undetected,
            timeout,
            totalResults,
            scamScore,
            lastAnalysisDate: new Date(lastAnalysisDate),
        };
    }

}