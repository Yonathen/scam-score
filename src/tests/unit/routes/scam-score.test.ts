import request from 'supertest';
import express from 'express';
import { ScamScoreRoutes } from '../../../routes/scam-score.config'

const app = express();
const route = new ScamScoreRoutes(app);

describe('App', () => {

    it('should invoke express once', async () => {
        const res = await request(app).get('/scamscore');
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(res.text).toEqual('GET request : SCAMscore');
    })
})
