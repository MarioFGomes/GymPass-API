import { FastifyInstance } from 'fastify';
import { GymUploadAvatar } from '../gym/gym-upload-avatar';
import { verifyJwt } from '@/middlewares/verify-jwt';
import { create } from './create';
import { search } from './search';
import { nearby } from './nearby';

export async function gymRoutes(app:FastifyInstance){
    app.addHook('onRequest',verifyJwt);
    app.put('/gym/upload-avatar/:id',GymUploadAvatar);
    app.post('/gym',create);
    app.get('/gyms/search',search);
    app.get('/gyms/nearby',nearby);
}