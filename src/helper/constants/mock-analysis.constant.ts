export const mockedAnalysis = {
    url: 'http://www.google.com',
    urlId: 'aHR0cDovL3d3dy5nb29nbGUuY29t',
    harmless: 85,
    malicious: 0,
    suspicious: 0,
    undetected: 8,
    timeout: 0,
    totalResults: 93,
    scamScore: 0,
    lastAnalysisDate: '1970-01-20T01:54:47.997Z'
};

export const mockedPayload = {data: {data: {attributes: {
    url: 'http://www.google.com/',
    last_analysis_stats: {
        harmless: 85,
        malicious: 0,
        suspicious: 0,
        undetected: 8,
        timeout: 0
    },
    last_analysis_date: 1648487997
}}}};