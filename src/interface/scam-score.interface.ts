
export interface IScamScore {
    harmless: number;
    malicious: number;
    suspicious: number;
    undetected: number;
    timeout: number;
    lastAnalysisDate: number;
    totalResults: number;
    scamScore: number;
}