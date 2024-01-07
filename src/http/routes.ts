import { FastifyInstance } from 'fastify';
import { register } from './controllers/register';
import { authenticate } from './controllers/authenticate';
import { profile } from './controllers/profile';
import { verifyJwt } from '@/middlewares/verify-jwt';
import { UserUploadAvatar } from './controllers/user-upload-avatar';
import { GymUploadAvatar } from './controllers/gym-upload-avatar';

export async function appRoutes(app:FastifyInstance){
    app.post('/users',register);
    app.post('/session',authenticate);
    app.get('/profile',{onRequest:[verifyJwt]},profile);
    app.put('/users/upload-avatar/:id',{onRequest:[verifyJwt]},UserUploadAvatar);
    app.put('/gym/upload-avatar/:id',{onRequest:[verifyJwt]},GymUploadAvatar);
}