import {describe,expect,it, beforeAll, afterAll } from 'vitest';
import {app} from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';
import { prisma } from '@/lib/prisma';

describe('Check-Ins history (e2e)', () => {

    beforeAll(async ()=>{
        app.ready();
    });

    afterAll(async ()=>{
        app.close();
    });

    it.skip('should be able list the history a Check-In ', async () => {

        const {token}= await createAndAuthenticateUser(app);

        const gym= await prisma.gym.create({
            data:{

                name:'Super power', 
                description:'same gym in Luanda', 
                phone:'949822470',
                avatarUrl:'https://gravatar.com/avatar/b1e5a4213d0c34459788ff593d7112ca?s=400&d=robohash&r=x',
                latitude:-8.8834048,
                longitude:-13.2513792
            }

        });

        const CheckInResponse=await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude:-8.8834048,
                longitude:-13.2513792
            });
            
        expect(CheckInResponse.statusCode).toEqual(201);
    });
});