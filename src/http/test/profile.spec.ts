import {describe,expect,it, beforeAll, afterAll } from 'vitest';
import {app} from '@/app';
import request from 'supertest';

describe('Profile (e2e)', () => {

    beforeAll(async ()=>{
        app.ready();
    });

    afterAll(async ()=>{
        app.close();
    });

    it('should be able get user profile', async () => {

        await  request(app.server).post('/users').send({
            name:'John Doe',
            email:'JohnDoe333@gmail.com',
            password:'7654342135'

        });

        const AuthenticateResponse=await  request(app.server).post('/session').send({
            email:'JohnDoe333@gmail.com',
            password:'7654342135'
        });

        const {token}=AuthenticateResponse.body;

        const ProfileResponse=await  request(app.server)
            .get('/profile')
            .set('Authorization', `Bearer ${token}`)
            .send();
            
        expect(ProfileResponse.statusCode).toEqual(200);
        expect(ProfileResponse.body.user).toEqual(expect.objectContaining({
            email: 'JohnDoe333@gmail.com'
        }));
    
    });
});