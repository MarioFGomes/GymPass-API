import { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app:FastifyInstance){

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

    return {
        token
    };
}