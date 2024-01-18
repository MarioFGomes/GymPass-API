import {describe,expect,it, beforeAll, afterAll } from 'vitest';
import {app} from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Profile (e2e)', () => {

    beforeAll(async ()=>{
        app.ready();
    });

    afterAll(async ()=>{
        app.close();
    });

    it('should be able get user profile', async () => {

        const {token}= await createAndAuthenticateUser(app);

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