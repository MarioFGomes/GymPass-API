import {describe,expect,it, beforeAll, afterAll } from 'vitest';
import {app} from '@/app';
import request from 'supertest';

describe('User Authenticate (e2e)', () => {

    beforeAll(async ()=>{
        app.ready();
    });

    afterAll(async ()=>{
        app.close();
    });

    it('should be able authenticate', async () => {

        await  request(app.server).post('/users').send({
            name:'Mário Gomes',
            email:'mariogomes333@gmail.com',
            password:'7654342135'

        });

        const response=await  request(app.server).post('/session').send({
            email:'mariogomes333@gmail.com',
            password:'7654342135'
        });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String)
        });
    });
});