import { FastifyInstance } from 'fastify';
import { register } from './register';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { verifyJwt } from '@/middlewares/verify-jwt';
import { UserUploadAvatar } from './user-upload-avatar';

export async function userRoutes(app:FastifyInstance){
    app.post('/users',register);
    app.post('/session',authenticate);
    app.get('/profile',{onRequest:[verifyJwt]},profile);
    app.put('/users/upload-avatar/:id',{onRequest:[verifyJwt]},UserUploadAvatar);
  
}