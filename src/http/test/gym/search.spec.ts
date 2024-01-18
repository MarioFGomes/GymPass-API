import {describe,expect,it, beforeAll, afterAll } from 'vitest';
import {app} from '@/app';
import request from 'supertest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Search Gym (e2e)', () => {

    beforeAll(async ()=>{
        app.ready();
    });

    afterAll(async ()=>{
        app.close();
    });

    it('should be able search a gym ', async () => {

        const {token}= await createAndAuthenticateUser(app);

        await request(app.server)
            .post('/gym')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name:'Super power', 
                description:'same gym in Luanda', 
                phone:'949822470',
                avatarUrl:'https://gravatar.com/avatar/b1e5a4213d0c34459788ff593d7112ca?s=400&d=robohash&r=x',
                latitude:-8.8834048,
                longitude:-13.2513792
            });

        await request(app.server)
            .post('/gym')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name:'Strong power', 
                description:'same gym in Luanda', 
                phone:'949822470',
                avatarUrl:'https://gravatar.com/avatar/b1e5a4213d0c34459788ff593d7112ca?s=400&d=robohash&r=x',
                latitude:-8.8834048,
                longitude:-13.2513792
            });

        const search=await request(app.server)
            .get('/gyms/search')
            .query({
                query:'Super'
            })
            .set('Authorization', `Bearer ${token}`);
            
        expect(search.statusCode).toEqual(200);
        expect(search.body.gyms).toHaveLength(1);
        expect(search.body.gyms).toEqual([
            expect.objectContaining({
                name: 'Super power'
            })
        ]);
    });
});