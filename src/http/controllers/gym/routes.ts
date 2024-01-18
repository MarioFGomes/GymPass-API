import { FastifyInstance } from 'fastify';
import { GymUploadAvatar } from '../gym/gym-upload-avatar';
import { verifyJwt } from '@/middlewares/verify-jwt';

export async function gymRoutes(app:FastifyInstance){
    app.addHook('onRequest',verifyJwt);
    app.put('/gym/upload-avatar/:id',GymUploadAvatar);
}