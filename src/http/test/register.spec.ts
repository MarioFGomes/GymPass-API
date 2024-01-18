import {describe,expect,it, beforeAll, afterAll } from 'vitest';
import {app} from '@/app';
import request from 'supertest';

describe('Register user (e2e)', () => {

    beforeAll(async ()=>{
        app.ready();
    });

    afterAll(async ()=>{
        app.close();
    });

    it('should be able register', async () => {
        const response=await request(app.server).post('/users').send({
            name:'Dario',
            email:'mariogomesDD333@gmail.com',
            password:'7654342135'

        });

        expect(response.statusCode).toEqual(201);
    });
});