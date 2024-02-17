import { FastifyInstance } from 'fastify';
import { verifyJwt } from '@/middlewares/verify-jwt';
import { history } from './history';
import { metrics } from './metrics';
import { create } from './create';
import { validate } from './validate';
import { VerifyUserRole } from '@/middlewares/verify-user-role';

export async function checkInsRoutes(app:FastifyInstance){
    app.addHook('onRequest',verifyJwt);

    app.get('/check-ins/history',history);
    app.get('/check-ins/metrics',metrics);
    app.post('/gyms/:gymId/check-ins',create);
    app.patch('/check-ins/:CheckInId/validate',{onRequest:[VerifyUserRole('ADMIN')]},validate);
}