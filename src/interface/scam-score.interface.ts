
export interface IScamScore {
    urlId: string;
    harmless: number;
    malicious: number;
    suspicious: number;
    undetected: number;
    timeout: number;
    lastAnalysisDate: Date;
    totalResults: number;
    scamScore: number;
}