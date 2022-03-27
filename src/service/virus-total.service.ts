import axios, { AxiosRequestConfig } from "axios";

import base64url from 'base64url';
import { logger } from "../helper/logger";
import { publicConfig } from "../../config/public.config";
import { IScamScore } from "../interface/scam-score.interface";

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
        const virusTotalResponse = await axios.get(`/${base64url(url)}`, this.request);
        const { data: {
            attributes: {
                last_analysis_date: lastAnalysisDate,
                last_analysis_stats: lastAnalysisStat 
            } 
        }} = virusTotalResponse?.data || {};

        return {lastAnalysisDate, lastAnalysisStat};
    }

    async calculateScamScore(url: string): Promise<IScamScore> {
        const { lastAnalysisDate, lastAnalysisStat } = await this.fetchVirusTotal(url);
        
        const { harmless = 0, malicious = 0, suspicious = 1, undetected = 0, timeout = 0 } = lastAnalysisStat || {};
        const totalResults = harmless + malicious + suspicious + undetected + timeout;
        const scamScore = (100 / (totalResults - undetected - timeout) * (malicious + suspicious + 1));
        logger.info(`VirusTotalService : calculateScamScore : ${scamScore}`);

        return { harmless, malicious, suspicious, undetected, timeout, lastAnalysisDate, totalResults, scamScore };
    }

}